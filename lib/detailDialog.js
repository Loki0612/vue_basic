/*
 * @Description: 详情模板页面
 * @Author: yzw
 * @Date: 2021-08-06 10:54:43
 * @LastEditTime: 2021-08-24 11:43:34
 * @LastEditors: yzw
 * @Reference:
 */

// template.js
module.exports = {
	template: config => {
        const template = `
<template>
  <el-dialog
    width="60%"
    title="${config.remark}详情"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    custom-class="basicDialog"
  >
    <div class="main">
      <el-descriptions title="标题" :column="3" :size="size">
        <template slot="extra">
          <el-button type="primary" icon="el-icon-edit-outline" circle />
        </template>
        <el-descriptions-item label="用户名">普通内容</el-descriptions-item>
        <el-descriptions-item label="用户名" span="2">长内容</el-descriptions-item>
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      </el-descriptions>
    </div>
    <template slot="footer" class="dialog-footer">
      <el-button size="medium" @click="updateVisible(false)">取 消</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { getDetail } from '@/api/${config.name.split('/').pop()}'
export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            size: 'medium',
            visible: false,
            detail: [] // 详情数据
        }
    },
    created() {
      this.getDetail()
    },
    mounted() {
    },
    methods: {
      getDetail() {
        getDetail(this.id).then(res => {
          this.detail = res
        })
      },
      updateVisible(flag) {
        this.visible = flag
      }
    }
}
</script>
<style>
.coverBox{
    height: 100%;
    width: 100%;
    position: absolute;
    top:0;
    left: 0;
    z-index: 1000;
}
</style>
        `
        return template
    }
}
