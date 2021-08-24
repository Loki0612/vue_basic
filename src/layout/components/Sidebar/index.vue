<!--
 * @Description: 
 * @Author: yzw
 * @Date: 2020-06-23 06:15:04
 * @LastEditTime: 2021-03-09 10:04:49
 * @LastEditors: yzw
 * @Reference: 
-->
<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="sidebar-container">
        <sidebar-item v-for="route in roles" :key="route.path" :item="route" :base-path="route.path" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'roles',
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
  }
}
</script>
