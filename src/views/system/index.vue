<!--
 * @Description: 系统设置
 * @Author: yzw
 * @Date: 2021-02-03 10:49:05
 * @LastEditTime: 2021-08-13 09:27:12
 * @LastEditors: yzw
 * @Reference:
-->

<template>
  <MenuBox :roles="secondMenu" />
  <!-- <div>
    <div v-for="item in secondMenu" :key="item.id" class="menu-item">
      <div>{{item}}</div>
  </div>
  </div>-->
</template>

<script>
import { mapGetters } from 'vuex'
import MenuBox from '@/components/MenuBox'
export default {
  name: 'System',
  components: { MenuBox },
  data() {
    return {
      secondMenu: []
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    const { roles } = this.$store.getters
    for (let i = 0; i < roles.length; i++) {
      const element = roles[i]
      if (element.name === 'systemMain') {
        this.secondMenu = element.children.filter(obj => obj.type === '4')
      }
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
