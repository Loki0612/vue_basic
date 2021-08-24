<!--
 * @LastEditors: Richardlv
 * @Author: Richardlv
-->

<template>
  <el-dialog
    width="60%"
    :title="
      this.editFlag == 0
        ? '新增角色'
        : this.editFlag == 1
        ? '修改角色'
        : '修改权限'
    "
    :visible.sync="insertFlag"
    @close="closeDialog()"
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
      :rules="insertRules"
    >
      <el-row v-if="editFlag == 1 || editFlag == 0">
        <el-col :span="12">
          <el-form-item label="角色名称" class="formItem" prop="name">
            <el-input v-model="detailData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色编码" class="formItem" prop="roleEncoding">
            <el-input v-model="detailData.roleEncoding"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="editFlag == 1 || editFlag == 0">
        <el-col :span="12">
          <el-form-item label="角色类型" class="formItem" prop="permissionType">
            <el-select
              v-model="detailData.permissionType"
              clearable
              placeholder="请选择"
            >
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
      <el-row v-if="editFlag == 1 || editFlag == 0">
        <el-col :span="24">
          <el-form-item label="角色描述" class="formItem" prop="remark">
            <el-input v-model="detailData.remark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="editFlag == 2 || editFlag == 0">
        <el-col :span="24">
          <el-tree
            :data="menuData"
            :props="{
              children: 'children',
              hasChildren: 'hasChildren',
              label: 'name',
            }"
            show-checkbox
            default-expand-all
            :expand-on-click-node="false"
            @check="selectMenu"
            node-key="id"
            check-on-click-node
            :default-checked-keys="oldCheckedMenu"
            ref="tree"
          >
          </el-tree>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeInsertFlag">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { roleInsert, roleMenu, roleEdit } from "@/api/character";
import { menuList } from "@/api/menu";
export default {
  data() {
    return {
      insertRules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, message: "至少需要 3 个字符", trigger: "blur" },
        ],
        roleEncoding: [
          { required: true, message: "请输入角色编码", trigger: "blur" },
          { min: 3, message: "至少需要 3 个字符", trigger: "blur" },
        ],
        permissionType: [
          { required: true, message: "请选择角色类型", trigger: "blur" },
        ],
      },
      typeOptions: [
        {
          value: "1",
          label: "功能权限",
        },
        {
          value: "2",
          label: "数据权限",
        },
      ],
      menuData: [],
    };
  },
  created() {
    this.getMenuData();
  },
  mounted() {},
  props: {
    detailData: Object,
    insertFlag: Boolean,
    editFlag: Number,
    oldCheckedMenu: Array,
  },
  methods: {
    closeDialog() {
      this.$refs.detailData.resetFields();
      this.$refs.tree.setCheckedKeys([]);
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
          if (this.editFlag == 0) {
            let parm = {};
            parm = this.detailData;
            parm.status = 0;
            roleInsert(parm).then((res) => {
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success",
              });
              this.changeInsertFlag();
              this.getTableData();
            });
          } else if (this.editFlag == 2) {
            let parm = {
              aclIdList: this.checkedMenu,
              roleId: this.detailData.id,
            };
            roleMenu(parm).then((res) => {
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success",
              });
              this.changeInsertFlag();
              this.getTableData();
            });
          } else if (this.editFlag == 1) {
            let parm = {};
            parm = this.detailData;
            roleEdit(parm).then((res) => {
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
    selectMenu(data, checkedData) {
      this.checkedMenu = checkedData.checkedKeys;
    },
    getMenuData() {
      menuList().then((res) => {
        console.log(333);
        this.menuData = res;
      });
    },
  },
};
</script>