<template>
  <div class="login-container">
    <el-image
      class="backgroundImg"
      :src="require(`@/assets/img/loginBG.png`)"
      fit="cover"
    />
    <el-image
      class="loginImg"
      :src="require(`@/assets/img/loginImg.png`)"
      fit="cover"
    />
    <div class="hosInfo-box">
      <el-image
        class="hosLogo"
        :src="common.fileUrl + hospitalInfo.logo"
        fit="cover"
      />
      <span class="hospitalName">{{ hospitalInfo.hospitalName }}</span>
    </div>
    <el-form
      ref="loginParam"
      :model="loginParam"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="top"
      :hide-required-asterisk="true"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="formLabel">用户名/手机号:</span>
        <el-input
          ref="username"
          v-model="loginParam.username"
          placeholder="用户名"
          name="username"
          maxlength="11"
          type="text"
          tabindex="1"
          auto-complete="on"
          class="inputBox"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="formLabel">密码:</span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginParam.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          class="inputBox"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        class="loginButton"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length === '') {
        callback(new Error('密码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      loginParam: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  computed: {
    ...mapGetters(['trueName', 'hospitalInfo'])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    /**
         * @description: 显示密码
         */
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    /**
         * @description: 登录
         */
    handleLogin() {
      this.$refs.loginParam.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('login', this.loginParam)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    .backgroundImg{
        position: absolute;
        top:0;
        left:0;
        width:75%;
        height:100%;
    }
    .loginImg{
        position: absolute;
        top:-10%;
        left:-15%;
        width:80%;
    }
    .hosInfo-box {
        left: 0;
        top: 0;
        position: absolute;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-top: 10px;
    }
    .hosLogo {
        width: auto;
        max-width: 70px;
        margin-left: 10px;
        margin-right: 10px;
        height: 40px;
    }
    .hospitalName {
        font-size: 28px;
        color: #fff;
        font-weight: 600;
    }
    .login-form {
        position: absolute;
        width: 360px;
        max-width: 100%;
        margin: 0 auto;
        overflow: hidden;
		top:20%;
		right:10%
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            text-align: left;
            font-weight: bold;
			color: #459bf7;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
	.loginButton{
		height: 52px;
		width: 360px;
		border-radius: 26px;
		font-size: 20px;
		margin-top: 50px;
	}
	.formLabel{
		color:#666666;
		font-size: 16px;
		margin-bottom:5px;
	}
	.inputBox input{
		height:52px
	}
	.el-form-item{
		margin-bottom:10px
	}
}
</style>
