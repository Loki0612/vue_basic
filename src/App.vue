<!--
 * @Description:
 * @Author: yzw
 * @Date: 2020-06-23 06:15:04
 * @LastEditTime: 2021-08-13 09:26:51
 * @LastEditors: yzw
 * @Reference:
-->
<template>
  <div id="app">
    <keep-alive>
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
	name: 'App',
  data() {
    return {
    }
  },
	mounted() {
		this.$store.dispatch('getHosInfo').then(res => {
			console.log('getHosInfo', res)
		})
	}
}
</script>
