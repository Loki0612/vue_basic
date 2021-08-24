<!--
 * @Description: 
 * @Author: yzw
 * @Date: 2020-06-23 06:15:04
 * @LastEditTime: 2021-03-09 11:19:12
 * @LastEditors: yzw
 * @Reference: 
-->
<template>
  <div class="app-wrapper">
    <div :class="{ 'fixed-header': fixedHeader }">
      <navbar />
    </div>
    <div class="main-container">
      <sidebar class="sidebar-container" />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  computed: {
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width:100%;
  transition: width 0.28s;
}

// .hideSidebar .fixed-header {
//   width: calc(100% - 54px);
// }

.mobile .fixed-header {
  width: 100%;
}
</style>
