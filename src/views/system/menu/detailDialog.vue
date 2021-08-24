<!--
 * @LastEditors: yzw
 * @Author: Richardlv
-->

<template>
  <el-dialog
    width="60%"
    title="菜单详情"
    :visible.sync="detailFlag"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form
      ref="detailData"
      :model="detailData"
      label-position="right"
      label-width="120px"
      class="formBox"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" class="formItem" prop="name">
            <el-input
              :readonly="true"
              class="el_input_cust"
              v-model="detailData.name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名称" class="formItem" prop="pageName">
            <el-input
              :readonly="true"
              class="el_input_cust"
              v-model="detailData.pageName"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="链接" class="formItem" prop="component">
            <el-input
              :readonly="true"
              class="el_input_cust"
              v-model="detailData.component"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" class="formItem" prop="type">
            <el-input
              :readonly="true"
              class="el_input_cust"
              v-model="typeList[detailData.type]"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="上级目录" class="formItem" prop="parentId">
            <el-cascader
              :options="tableData"
              :props="{
                checkStrictly: true,
                label: 'name',
                value: 'id',
              }"
              v-model="detailData.parentId"
              clearable
              filterable
              class="el_input_cust"
            >
            </el-cascader>
            <div class="coverBox"></div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="目标" class="formItem" prop="path">
            <el-input
              :readonly="true"
              class="el_input_cust"
              v-model="detailData.path"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="权限标识" class="formItem" prop="permission">
            <el-input
              :readonly="true"
              class="el_input_cust"
              v-model="detailData.permission"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" class="formItem" prop="sort">
            <el-input
              :readonly="true"
              class="el_input_cust"
              v-model="detailData.sort"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="图标" class="formItem" prop="icon">
            <el-input
              :readonly="true"
              class="el_input_cust"
              v-model="detailData.icon"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否缓存" class="formItem" prop="keepAlive">
            <el-radio v-model="detailData.keepAlive" label="0">启用</el-radio>
            <el-radio v-model="detailData.keepAlive" label="1">禁用</el-radio>
            <div class="coverBox"></div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否隐藏" class="formItem" prop="hidden">
            <el-radio v-model="detailData.hidden" label="0">启用</el-radio>
            <el-radio v-model="detailData.hidden" label="1">禁用</el-radio>
            <div class="coverBox"></div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="面包屑导航" class="formItem" prop="breadcrumb">
            <el-radio v-model="detailData.breadcrumb" label="0">启用</el-radio>
            <el-radio v-model="detailData.breadcrumb" label="1">禁用</el-radio>
            <div class="coverBox"></div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态" class="formItem" prop="status">
            <el-radio v-model="detailData.status" label="0">启用</el-radio>
            <el-radio v-model="detailData.status" label="1">禁用</el-radio>
            <div class="coverBox"></div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" class="formItem" prop="remark">
            <el-input
              :readonly="true"
              class="el_input_cust"
              v-model="detailData.remark"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeDetailFlag()">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      typeList: ["", "一级菜单", "功能按钮", "其他", "二级菜单"],
    };
  },
  mounted() {},
  props: {
    tableData: Array,
    dept_type: Array,
    detailFlag: Boolean,
    detailData: Object,
  },
  methods: {
    changeDetailFlag() {
      this.$emit("changeDetailFlag");
    },
  },
};
</script>
<style>
.coverBox {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}
.el_input_cust input {
  border: none;
}
.el_input_cust textarea {
  border: none;
}
.el_input_cust .el-input__suffix {
  display: none;
}
</style>