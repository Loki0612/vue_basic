<!--
 * @Description: 首页
 * @Author: yzw
 * @Date: 2020-06-23 06:15:04
 * @LastEditTime: 2021-04-26 13:55:35
 * @LastEditors: yzw
 * @Reference: 
-->

<template>
    <div class="home-container">
        <div class="home-text">roles: {{ roles }}</div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Home",
    ...mapGetters([
      'roles',
    ]),
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters(["userName", "roles"]),
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.home {
    &-container {
        margin: 15px;
        margin-top: $hamBarHeight;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
        color: #000;
    }
}
</style>
