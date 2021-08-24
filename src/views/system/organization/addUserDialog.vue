<!--
 * @LastEditors: yzw
 * @Author: Richardlv
-->

<template>
  <div>
    <el-dialog
      width="60%"
      :visible.sync="addUserFlag"
      title="分配用户"
      @close="closeDetailDialog()"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-row style="margin-bottom: 10px">
        <el-col :span="8">机构名称:{{ detailData.name }}</el-col>
        <el-col :span="8"
          >机构类型:{{ changeDeptType[detailData.deptType] }}</el-col
        >
      </el-row>
      <el-button
        style="margin-bottom: 10px"
        type="success"
        @click="addUser()"
        size="small"
        >新增</el-button
      >
      <el-table
        ref="orgUserData"
        :data="orgUserData"
        border
        row-key="id"
        highlight-current-row
        height="400"
      >
        <el-table-column
          prop="trueName"
          label="姓名"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" align="center">
        </el-table-column>
        <el-table-column
          prop="username"
          label="账号"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="150" align="center">
        </el-table-column>
        <el-table-column
          prop="doctorPosition"
          label="岗位"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          class-username="status-col"
          align="center"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="请确认是否删除此条数据？"
              @confirm="toDelOrgUser(scope.row.id)"
            >
              <el-button type="danger" size="mini" plain slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-footer class="paginationBox" height="60px">
        <el-pagination
          @size-change="setOrgUserPageSize"
          @current-change="setOrgUserPageNo"
          :current-page="orgUserPageNo"
          :page-sizes="common.pageSizes"
          :page-size="orgUserPageSize"
          background
          layout="total, sizes, prev, pager, next"
          :total="orgUserTotalNum"
        >
        </el-pagination>
      </el-footer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeAddUserFlag">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      top="10vh"
      width="60%"
      :visible.sync="userFlag"
      title="选择用户"
      @close="closeUserDialog()"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form
        ref="userSearchForm"
        :inline="true"
        :model="userSearchForm"
        class="userSearchForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="userSearchForm.name"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input
            v-model="userSearchForm.workNumber"
            placeholder="请输入工号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="doctorPosition">
          <el-select
            v-model="userSearchForm.doctorPosition"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in doctorPositionOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="getUserData">
            查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="default"
            @click="resetForm('userSearchForm')"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="userdata"
        border
        row-key="id"
        highlight-current-row
        @select="selectUser"
        @select-all="selectUser"
        height="400"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column
          prop="trueName"
          label="姓名"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" align="center">
        </el-table-column>
        <el-table-column
          prop="username"
          label="账号"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="doctorPosition"
          label="岗位"
          width="200"
          align="center"
        >
        </el-table-column>
      </el-table>
      <el-footer class="paginationBox" height="60px">
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
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-row type="flex" justify="space-between">
            <el-button size="small" type="primary" @click="confirmUser()"
              >确认</el-button
            >
            <el-button size="small" @click="userFlag = false">取消</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList } from "@/api/user";
import { getDict } from "@/api/common";
import { addUserToDept, disassociate } from "@/api/organization";
export default {
  data() {
    return {
      orgUserPageNo: 1, //页码
      orgUserPageSize: 10, //显示数量
      orgUserTotalNum: 0, //总条数
      orgUserData: [],
      userFlag: false,
      userdata: [],
      allPageUser: [],
      userSearchForm: {},
      userSearchForm: {
        workNumber: "",
        name: "",
        doctorPosition: "",
      },
      doctorPositionOption: [],
      pageNo: 1, //页码
      pageSize: 10, //显示数量
      totalNum: 0, //总条数
    };
  },
  mounted() {},
  created() {
    this.getDoctorPosition();
  },
  watch: {
    detailData() {
      this.getOrgUser();
    },
  },
  props: {
    changeDeptType: Array,
    addUserFlag: Boolean,
    detailData: Object,
  },
  methods: {
    toDelOrgUser(userId) {
      let parm = {
        deptId: this.detailData.id,
        userId: userId,
      };
      disassociate(parm).then((res) => {
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success",
        });
        this.getOrgUser();
      });
    },
    closeDetailDialog() {
      this.orgUserData = [];
      this.orgUserPageNo = 1;
      this.orgUserPageSize = 10;
    },
    addUser() {
      this.userFlag = true;
      this.getUserData();
    },
    setUser() {
      this.$nextTick(() => {
        let userIdCrash = [];
        userIdCrash = this.allPageUser[this.orgUserPageNo];
        if (userIdCrash && userIdCrash.length > 0) {
          this.userdata.map((item, index) => {
            if (userIdCrash.indexOf(item.id) > -1) {
              this.$refs.multipleTable.toggleRowSelection(
                this.userdata[index],
                true
              );
            }
          });
        }
      });
    },
    changeAddUserFlag() {
      this.$emit("changeAddUserFlag");
    },
    setOrgUserPageSize(val) {
      this.orgUserPageSize = val;
      this.getOrgUser();
    },
    setOrgUserPageNo(val) {
      this.orgUserPageNo = val;
      this.getOrgUser();
    },
    getOrgUser() {
      let parm = {
        current: this.orgUserPageNo,
        size: this.orgUserPageSize,
        onlyDeptId: this.detailData.id,
      };
      getUserList(parm).then((res) => {
        const { total, records } = res;
        this.orgUserData = records;
        this.orgUserTotalNum = parseInt(total);
      });
    },
    selectUser(selection) {
      let pageUserCrash = this.allPageUser;
      let nowPageUserId = selection.map((item, index) => {
        return item.id;
      });
      pageUserCrash[this.pageNo] = nowPageUserId;
      this.allPageUser = pageUserCrash;
    },
    setPageSize(val) {
      this.pageSize = val;
      this.getUserData();
    },
    setPageNo(val) {
      this.pageNo = val;
      this.getUserData();
    },
    getUserData() {
      let param = {
        status: 0,
        current: this.pageNo,
        size: this.pageSize,
        notShowDeptId: this.detailData.id,
        name: this.userSearchForm.name,
        doctorPosition: this.userSearchForm.doctorPosition,
        workNumber: this.userSearchForm.workNumber,
      };
      getUserList(param).then((res) => {
        const { total, records } = res;
        this.userdata = records;
        this.totalNum = parseInt(total);
        setTimeout(() => {
          this.setUser();
        }, 10);
      });
    },
    getDoctorPosition() {
      getDict({ type: "doctor_position" }).then((res) => {
        this.doctorPositionOption = res.doctor_position;
      });
    },
    closeUserDialog() {
      this.userdata = [];
      this.allPageUser = [];
      this.userSearchForm = {
        workNumber: "",
        name: "",
        doctorPosition: "",
      };
      this.pageNo = 1;
      this.pageSize = 10;
    },
    confirmUser() {
      let allUserId = [];
      this.allPageUser.map((item, index) => {
        if (item && item.length > 0) {
          allUserId = allUserId.concat(item);
        }
      });
      if (allUserId.length > 0) {
        let parm = {
          relIds: allUserId,
          id: this.detailData.id,
        };
        addUserToDept(parm).then((res) => {
          this.$message({
            showClose: true,
            message: "操作成功",
            type: "success",
          });
          this.userFlag = false;
          this.getOrgUser();
        });
      } else {
        this.$message({
          showClose: true,
          message: "请选择用户",
          type: "warn",
        });
      }
    },
  },
};
</script>