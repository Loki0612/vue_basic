<!--
 * @LastEditors: yzw
 * @Author: Richardlv
-->

<template>
  <el-dialog
    width="60%"
    :title="this.insertType ? '新增菜单' : '修改菜单'"
    :visible.sync="insertFlag"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @close="closeDialog()"
  >
    <el-form
      ref="detailData"
      :model="detailData"
      label-position="right"
      label-width="120px"
      class="formBox"
      :rules="insertRules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" class="formItem" prop="name">
            <el-input v-model="detailData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名称" class="formItem" prop="pageName">
            <el-input v-model="detailData.pageName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="链接" class="formItem" prop="component">
            <el-input v-model="detailData.component"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" class="formItem" prop="type">
            <el-select v-model="detailData.type" clearable placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
            >
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="目标" class="formItem" prop="path">
            <el-input v-model="detailData.path"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="权限标识" class="formItem" prop="permission">
            <el-input v-model="detailData.permission"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" class="formItem" prop="sort">
            <el-input v-model="detailData.sort"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="图标" class="formItem" prop="icon">
            <el-input v-model="detailData.icon"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否缓存" class="formItem" prop="keepAlive">
            <el-radio v-model="detailData.keepAlive" label="0">启用</el-radio>
            <el-radio v-model="detailData.keepAlive" label="1">禁用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否隐藏" class="formItem" prop="hidden">
            <el-radio v-model="detailData.hidden" label="0">启用</el-radio>
            <el-radio v-model="detailData.hidden" label="1">禁用</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="面包屑导航" class="formItem" prop="breadcrumb">
            <el-radio v-model="detailData.breadcrumb" label="0">启用</el-radio>
            <el-radio v-model="detailData.breadcrumb" label="1">禁用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态" class="formItem" prop="status">
            <el-radio v-model="detailData.status" label="0">启用</el-radio>
            <el-radio v-model="detailData.status" label="1">禁用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" class="formItem" prop="remark">
            <el-input v-model="detailData.remark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeInsertFlag()">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  menuList,
  menuDisable,
  menuInsert,
  menuDel,
  menuInfo,
  menuEdit,
} from "@/api/menu";
export default {
  data() {
    return {
      insertRules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, message: "至少需要 3 个字符", trigger: "blur" },
        ],
        pageName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, message: "至少需要 3 个字符", trigger: "blur" },
        ],
        component: [{ required: true, message: "请输入链接", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        path: [{ required: true, message: "请输入目标", trigger: "blur" }],
        permission: [
          { required: true, message: "请输入权限标识", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
        icon: [{ required: true, message: "请输入图标", trigger: "blur" }],
        keepAlive: [
          { required: true, message: "请选择是否缓存", trigger: "blur" },
        ],
        hidden: [
          { required: true, message: "请选择是否隐藏", trigger: "blur" },
        ],
        breadcrumb: [
          { required: true, message: "请选择面包屑导航", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      typeOptions: [
        {
          value: "1",
          label: "一级菜单",
        },
        {
          value: "4",
          label: "二级菜单",
        },
        {
          value: "2",
          label: "功能按钮",
        },
        {
          value: "3",
          label: "其他",
        },
      ],
    };
  },
  mounted() {},
  props: {
    tableData: Array,
    dept_type: Array,
    insertFlag: Boolean,
    detailData: Object,
    insertType: Boolean,
  },
  methods: {
    closeDialog() {
      this.$refs.detailData.resetFields();
      this.$emit("closeDialog");
    },
    changeInsertFlag() {
      this.$emit("changeInsertFlag");
    },
    getTableData() {
      this.$emit("getTableData");
    },
    submit() {
      this.$refs.detailData.validate((valid) => {
        if (valid) {
          if (this.insertType) {
            let parm = {};
            if (typeof this.detailData.parentId == "string") {
              parm = this.detailData;
            } else {
              parm = this.detailData;
              parm.parentId = parm.parentId[parm.parentId.length - 1];
            }
            menuInsert(parm).then((res) => {
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success",
              });
              this.changeInsertFlag();
              this.getTableData();
            });
          } else {
            let parm = {};
            if (typeof this.detailData.parentId == "string") {
              parm = this.detailData;
            } else {
              parm = this.detailData;
              parm.parentId = parm.parentId[parm.parentId.length - 1];
            }
            menuEdit(parm).then((res) => {
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success",
              });
              this.changeInsertFlag();
              this.getTableData();
            });
          }
        }
      });
    },
  },
};
</script>