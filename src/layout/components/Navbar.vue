<template>
  <div class="navbar">
    <div class="hosInfo-box">
      <el-image
        class="hosLogo"
        :src="common.fileUrl + hospitalInfo.logo"
        fit="cover"
      ></el-image>
      <span class="hospitalName">{{ hospitalInfo.hospitalName }}</span>
      <span class="systemName">{{ hospitalInfo.systemName }}</span>
    </div>
    <div class="right-menu">
      <div class="right-menu-box">
        <svg-icon icon-class="info" class="right-menu-icon" />
        <div class="right-menu-text">消息</div>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="right-menu-box">
          <svg-icon icon-class="qrcode" class="right-menu-icon" />
          <div class="right-menu-text">二维码</div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item
            ><el-image
              class="nav-qrcode"
              :src="common.fileUrl + hospitalInfo.appDownloadAddress"
          /></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="right-menu-box">
          <svg-icon icon-class="navUser" class="right-menu-icon" />
          <div class="right-menu-text">{{ trueName }}</div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item @click.native="dialogVisible = true"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :modal-append-to-body="false"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        class="formBox"
        :rules="rules"
      >
        <el-row class="formRow">
          <el-form-item label="旧密码" class="formItem" prop="oldPassword">
            <el-input
              v-model="form.oldPassword"
              clearable
              show-password
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row class="formRow">
          <el-form-item label="新密码" class="formItem" prop="newPassword">
            <el-input
              v-model="form.newPassword"
              clearable
              show-password
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row class="formRow">
          <el-form-item label="确认密码" class="formItem" prop="newPassword1">
            <el-input
              v-model="form.newPassword1"
              clearable
              show-password
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updatePassword } from "@/api/userInfo";
import hospital from '@/store/modules/hospital';

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      form: {
        oldPassword: "",
        newPassword: "",
        newPassword1: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, max: 12, message: "请输入 6 - 12 个字符", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 12, message: "请输入 6 - 12 个字符", trigger: "blur" },
        ],
        newPassword1: [
          { validator: validatePassword, trigger: "blur", required: true },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["trueName", "hospitalInfo"]),
  },
  created() {
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          updatePassword(this.form).then((res) => {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success",
            });
            this.dialogVisible = false;
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.navbar {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: $theme;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    &-box {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      width: auto;
      padding-right: 20px;
      cursor: pointer;
    }
    &-icon {
      color: #fff;
      font-size: 22px;
      margin-right: 10px;
      margin-left: 15px;
    }
    &-text {
      color: #fff;
      font-size: 16px;
      min-width: 50px;
    }
  }
  .hosInfo-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: $navBarHeight;
  }
  .hosLogo {
    width: auto;
    max-width: 70px;
    margin-left: 10px;
    margin-right: 10px;
    height: 38px;
  }
  .hospitalName {
    font-size: 28px;
    color: #fff;
    font-weight: 600;
  }
  .systemName {
    font-size: 16px;
    color: #fff;
    margin-left: 10px;
    margin-top: 11px;
  }
}
.user-dropdown {
  z-index: 100001 !important;
}
.nav-qrcode {
  width: 200px;
  height: 200px;
  margin-top: 10px;
}
</style>
