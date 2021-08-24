<!--
 * @Description: 内容显示区域
 * @Author: yzw
 * @Date: 2020-06-23 06:15:04
 * @LastEditTime: 2021-03-15 15:33:23
 * @LastEditors: Richardlv
 * @Reference: 
-->
<template>
  <section class="app-main">
    <div class="ham-box">
      <el-image class="ham-img" :src="require('@/assets/img/zd.png')" fill='contain'/>
      <breadcrumb class="breadcrumb-container" />
    </div>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "AppMain",
  components: {
    Breadcrumb,
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  methods:{
  }
};
</script>

<style scoped lang='scss'>
@import "~@/styles/variables.scss";

.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - #{$navBarHeight});
  width: calc(100vw - #{$sideBarWidth} - 20px);
  margin-left: $sideBarWidth;
  padding-top: $navBarHeight;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.ham-box{
  width: 100%;
  height: $hamBarHeight;
  border-bottom: 1px solid #ececec;
  position: fixed;
  background: #fff;
  z-index: 6;
}
.ham-img{
  position: absolute;
  left: -6px;
  top: -2px;
}
.hamburger-container {
  line-height: 40px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}

.breadcrumb-container {
  float: left;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    // padding-right: 15px;
  }
}
</style>
