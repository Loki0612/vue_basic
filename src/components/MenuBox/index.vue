<!--
 * @Description: 菜单框
 * @Author: yzw
 * @Date: 2021-03-10 11:16:11
 * @LastEditTime: 2021-08-11 16:12:34
 * @LastEditors: yzw
 * @Reference:
-->
<template>
  <el-container>
    <el-scrollbar style="height: 100%; width: 100%">
      <el-main class="menu-main basic-main">
        <div class="menu-box">
          <div v-for="item in roles" :key="item.id" class="menu-item">
            <router-link :to="item.path">
              <el-image
                class="menu-item-img"
                :src="require(`@/assets/btnImg${item.path}.png`)"
                fit="contain"
              />
            </router-link>
          </div>
        </div>
      </el-main>
    </el-scrollbar>
  </el-container>
</template>

<script>
export default {
	name: 'MenuBox',
	props: {
		roles: {
			type: Array,
			required: true
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang='scss' scoped>
.menu-main {
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 89%;
  margin: 0 auto;
  &::after {
    content: "";
    flex: 1;
  }
}
.menu-item {
  width: calc(calc(100% - 168px) / 6);
  margin: 14px;
  &-img {
    width: 100%;
    transition: box-shadow 0.2s;
    border-radius: 5px;
    &:hover{
    box-shadow: 8px 6px 26px 1px
		rgba(108, 108, 108, 0.41);
    }
  }
}
</style>
