<!--
 * @Description: 用户管理
 * @Author: yzw
 * @Date: 2021-02-03 10:49:05
 * @LastEditTime: 2021-03-24 13:58:01
 * @LastEditors: yzw
 * @Reference:
-->

<template>
  <el-scrollbar style="height: 100%; width: 100%">
    <el-container>
      
      <el-main class="basic-main">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input placeholder="请输入部门名称" v-model="filterText" style="margin-top: 20px;">
            </el-input>
            <el-tree
              class="filter-tree tree"
              :data="treeData"
              default-expand-all
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              @node-click="depChoice"
              ref="tree"
            >
            </el-tree>
          </el-col>
          <el-col :span="20">
            <el-header height="auto">
              <el-form
                ref="searchForm"
                :inline="true"
                :model="searchForm"
                class="searchForm"
              >
                <el-form-item label="姓名" prop="name">
                  <el-input
                    v-model="searchForm.name"
                    placeholder="请输入用户名..."
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="username">
                  <el-input
                    v-model="searchForm.username"
                    placeholder="请输入账号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input
                    v-model="searchForm.phone"
                    placeholder="请输入手机号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-select
                    v-model="searchForm.status"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <div class="search-btn-group">
                  <el-form-item>
                    <el-button type="primary" @click="getTableData">查询</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" plain @click="resetForm('searchForm')"
                      >重置</el-button
                    >
                  </el-form-item>
                  <el-form-item style="margin-right:0">
                    <el-button type="default" @click="back()">返回</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </el-header>
            <el-divider></el-divider>

            <el-button
              type="success"
              @click="toDetail()"
              style="margin-bottom: 10px"
              >新增</el-button
            >
            <el-table
              ref="mainTable"
              :data="tableData"
              style="width: 100%"
              border
              highlight-current-row
              row-key="id"
            >
              <!-- 姓名 trueName	姓名	string	 -->
              <el-table-column
                prop="trueName"
                label="姓名"
                align="center"
              >
                <template slot-scope="scope">
                  <a @click="showUser(scope.row)" class="clickCell">{{scope.row.trueName}}</a>
                </template>
              </el-table-column>
              <!-- 工号 workNumber	工号  -->
              <el-table-column
                prop="workNumber"
                label="工号"
                align="center"
              ></el-table-column>
              <!-- 账号 username	账号	string	 -->
              <el-table-column
                prop="username"
                label="账号"
                align="center"
              ></el-table-column>
              <!-- 手机号 phone	手机号	string	 -->
              <el-table-column
                prop="phone"
                label="手机号"
                width="120"
                align="center"
              ></el-table-column>
              <!-- 岗位 doctorPosition	岗位	string	 -->
              <el-table-column
                prop="doctorPosition"
                label="岗位"
                width="100"
                align="center"
              ></el-table-column>
              <!-- 状态 status	禁用状态 0:正常,1:禁用	string -->
              <el-table-column
                prop="status"
                label="禁用/启用"
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.choice"
                    @change="changeStatus(scope.row)"
                  >
                  </el-switch>
                </template>
              </el-table-column>
              <!-- 创建时间  createDate	创建时间	string(date-time)-->
              <el-table-column
                prop="createDate"
                label="创建时间"
                show-overflow-tooltip
                align="left"
                header-align="center"
                width="100"
                :formatter="dateFormat"
              >
              </el-table-column>
              <!-- 操作  -->
              <el-table-column
                class-username="status-col"
                align="center"
                label="操作"
                width="300"
                fixed="right"
              >
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    plain
                    @click="editUserInfo(scope.row)"
                    style="margin-right: 15px"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    confirm-button-text="好的"
                    cancel-button-text="不用了"
                    icon="el-icon-info"
                    icon-color="red"
                    title="请确认是否删除此条数据？"
                    @confirm="onDelUser(scope.row.id)"
                  >
                    <el-button
                      type="danger"
                      size="mini"
                      plain
                      slot="reference"
                      style="margin-right: 15px"
                      >删除</el-button
                    >
                  </el-popconfirm>
                  <el-popconfirm
                    confirm-button-text="好的"
                    cancel-button-text="不用了"
                    icon="el-icon-info"
                    icon-color="red"
                    title="请确认是否重置该用户密码？"
                    @confirm="resetPwd(scope.row.id)"
                  >
                    <el-button type="warning" size="mini" plain slot="reference"
                      >重置密码</el-button
                    >
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
      <el-footer class="paginationBox" height="72px">
        <el-pagination
          @size-change="setPageSize"
          @current-change="setPageNo"
          :current-page="pageNo"
          :page-sizes="common.pageSizes"
          :page-size="pageSize"
          background
          layout="total, sizes, prev, pager, next"
          :total="totalNum"
        >
        </el-pagination>
      </el-footer>
      <myDialog v-if="this.edit" :dialogTitle="this.dialogTitle" :dialogVisible="this.edit" :row="this.row" @cancelSubmit="cancelSubmit" @onSubmit="onSubmit" />
      <detailDialog v-if="this.show" dialogTitle="查看用户" :dialogVisible="this.show" :row="this.row" @cancelSubmit="close" />
    </el-container>
  </el-scrollbar>
</template>

<script>
import {
  getUserList,
  createUser,
  updateUserInfo,
  delUser,
  resetUserPwd,
  disableUser,
  getUserInfo,
} from "@/api/user";
import { orgList } from "@/api/organization"
import { getDict } from "@/api/common";
import myDialog from "@/views/system/user/dialog"
import detailDialog from "@/views/system/user/detailDialog"
import moment from "moment";
export default {
  name: "userIndex",
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  components: {
    myDialog,
    detailDialog
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (this.form.id) {
        if (value != this.form.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      } else {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.form.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      }
    };
    return {
      row: {},
      edit: false,
      show: false,
      searchForm: {
        name: "",
        phone: "",
        status: "",
        deptId: 0
      },
      filterText: "",
      pageNo: 1, //页码
      pageSize: 10, //显示数量
      totalNum: 0, //总条数
      statusOptions: [
        //类型配置
        {
          label: "启用",
          value: "0",
        },
        {
          label: "禁用",
          value: "1",
        },
      ],
      tableData: [], //表格数据
      treeData: [],
      dialogTitle: "新增用户",
    };
  },
  created() {},
  mounted() {
    this.getTableData();
    this.getDeptData();
  },
  methods: {
    close() {
      this.show = false;
    },
    showUser(row){
      this.show = true
      this.row = row
    },
    dateFormat(row, column) {
      let date = row[column.property];
      return date ? moment(date).format("YYYY-MM-DD") : "";
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    depChoice(obj) {
      this.searchForm.deptId = obj.id
      this.getTableData()
    },
    onSubmit(params) {
      if (params.id) {
        updateUserInfo(params).then((res) => {
          this.onSubmitSuccess(res);
        });
      } else {
        createUser(params).then((res) => {
          this.onSubmitSuccess(res,);
        });
      }
    },
    onSubmitSuccess(res) {
      this.$message({
        showClose: true,
        message: "操作成功",
        type: "success",
      });
      this.edit=false;
      this.getTableData();
    },
    onDelUser(id) {
      delUser({ id }).then((res) => {
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success",
        });
        this.getTableData();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetPwd(id) {
      resetUserPwd({ id }).then((res) => {
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success",
        });
      });
    },
    back() {
      this.$router.push({ path: "/system" });
    },
    getTableData() {
      let searchForm = this.searchForm;
      if (!searchForm.deptId || searchForm.deptId === "0") {
        delete searchForm.deptId
      }
      let param = Object.assign(searchForm, {
        current: this.pageNo,
        size: this.pageSize,
      });
      getUserList(param).then((res) => {
        const { total, records } = res;
        let newRecords = records.map((item) => ({
          ...item,
          choice: item.status === "0",
        }));
        this.tableData = newRecords;
        this.totalNum = parseInt(total);
      });
    },
    getDeptData() {
      orgList({}).then((res) => {
        this.treeData = res;
      });
    },
    setPageNo(val) {
      this.pageNo = val;
      this.getTableData();
    },
    changeStatus(row) {
      const { id, status } = row;
      let disabledStatus = ["1", "0"];
      disableUser({ id, status: disabledStatus[status] })
        .then((res) => {
          this.$message({
            showClose: true,
            message: "操作成功",
            type: "success",
          });
          this.getTableData();
        })
        .catch((err) => {
          this.getTableData();
        });
    },
    setPageSize(val) {
      this.pageSize = val;
      this.getTableData();
    },
    toDetail(row) {
      if (row) {
        this.row = row
        this.dialogTitle = "编辑用户"
      } else {
        this.row = {}
        this.dialogTitle = "新增用户"
      }
      this.edit = true
    },
    editUserInfo(row) {
      const { id } = row;
      getUserInfo({ id }).then((res) => {
        let info = res.sysUserDetailsRes;
        this.toDetail(info);
      });
    },
    cancelSubmit() {
      this.edit = false;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~@/styles/variables.scss";
.tree {
  border: 1px solid $themeGray;
  border-radius: 4px;
  margin-top: 24px;
  height: 654px;
  overflow-y: auto;
}
.clickCell {
  color: $theme;
  cursor: pointer;
}
.el-divider{
  margin-bottom: 10px;
}
</style>
