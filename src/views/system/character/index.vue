<!--
 * @Description: 角色管理
 * @Author: yzw
 * @Date: 2021-02-03 10:49:05
 * @LastEditTime: 2021-08-11 15:55:50
 * @LastEditors: yzw
 * @Reference:
-->

<template>
  <el-scrollbar style="height: 100%; width: 100%">
    <el-container>
      <el-header height="auto">
        <el-form
          ref="searchForm"
          :inline="true"
          :model="searchForm"
          class="searchForm"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入角色名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="角色编码" prop="roleEncoding">
            <el-input
              v-model="searchForm.roleEncoding"
              placeholder="请输入角色编码"
              clearable
            />
          </el-form-item>
          <el-form-item label="权限类型" prop="permissionType">
            <el-select
              v-model="searchForm.permissionType"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in permissionTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
              />
            </el-select>
          </el-form-item>
          <div class="search-btn-group">
            <el-form-item>
              <el-button type="primary" @click="getTableData">
                查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                plain
                @click="resetForm('searchForm')"
              >
                重置
              </el-button>
            </el-form-item>
            <el-form-item style="margin-right: 0">
              <el-button
                type="default"
                @click="back()"
              >返回</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-header>
      <el-divider />
      <el-row class="table-btn-group">
        <el-button type="success" @click="toInsert()">新增</el-button>
      </el-row>
      <el-main class="basic-main">
        <el-table
          ref="mainTable"
          :data="tableData"
          style="width: 100%"
          border
          highlight-current-row
          row-key="id"
        >
          <el-table-column
            prop="name"
            label="角色名称"
            align="center"
          >
            <template slot-scope="scope">
              <span
                class="clickCell"
                @click="nameClick(scope.row)"
              >
                {{ scope.row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="roleEncoding"
            label="角色编码"
            align="center"
          />
          <el-table-column
            prop="permissionType"
            label="权限类型"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              {{ permissionTypeList[scope.row.permissionType] }}
            </template>
          </el-table-column>
          <el-table-column
            prop="userCount"
            label="用户"
            width="80"
            align="center"
          />
          <el-table-column
            class-username="status-col"
            align="center"
            label="禁用/启用"
            width="100"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="0"
                inactive-value="1"
                @change="setStatus(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间"
            show-overflow-tooltip
            align="center"
            header-align="center"
            width="180"
          />
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
                @click="toEdit(1, scope.row)"
              >编辑</el-button>
              <el-button
                type="primary"
                size="mini"
                plain
                @click="toEdit(2, scope.row)"
              >权限</el-button>
              <el-button
                type="primary"
                size="mini"
                plain
                style="margin-right: 10px"
                @click="toDetail(scope.row)"
              >分配用户</el-button>
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                title="请确认是否删除此条数据？"
                @confirm="toDel(scope.row.id)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  size="mini"
                  plain
                >删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <insertDialog
        :detail-data="detailData"
        :insert-flag="insertFlag"
        :edit-flag="editFlag"
        :old-checked-menu="oldCheckedMenu"
        @closeDialog="closeDialog"
        @changeInsertFlag="changeInsertFlag"
        @getTableData="getTableData"
      />
      <addUserDialog
        :detail-data="detailData"
        :add-user-flag="addUserFlag"
        @changeAddUserFlag="changeAddUserFlag"
      />
      <detailDialog
        :detail-data="detailData"
        :detail-flag="detailFlag"
        :old-checked-menu="oldCheckedMenu"
        @changedetailFlag="changedetailFlag"
      />
    </el-container>
  </el-scrollbar>
</template>

<script>
import { roleList, roleDisable, getAclList, roleDel } from '@/api/character'
import _ from 'lodash'
import moment from 'moment'
import insertDialog from '@/views/system/character/insertDialog'
import addUserDialog from '@/views/system/character/addUserDialog'
import detailDialog from '@/views/system/character/detailDialog'
export default {
	name: 'Character',
	components: {
		insertDialog,
		addUserDialog,
		detailDialog
	},
	data() {
		return {
			searchForm: {
				permissionType: '',
				status: '',
				name: '',
				roleEncoding: ''
			},
			permissionTypeOption: [
				{
					value: '1',
					label: '功能权限'
				},
				{
					value: '2',
					label: '数据权限'
				}
			],
			statusOptions: [
				{
					value: '0',
					label: '启用'
				},
				{
					value: '1',
					label: '禁用'
				}
			],
			tableData: [],
			permissionTypeList: ['', '功能权限', '数据权限'],
			insertFlag: false,
			detailData: {
				name: '',
				permissionType: '',
				remark: '',
				roleEncoding: '',
				id: ''
			},
			oldCheckedMenu: [],
			editFlag: 0, // 0-新增 1-编辑 2-权限
			addUserFlag: false,
			detailFlag: false
		}
	},
	created() {
		this.getTableData()
	},
	mounted() {},
	methods: {
		changedetailFlag() {
			this.detailFlag = false
		},
		nameClick(item) {
			let detailDataCrash = {}
			detailDataCrash = _.cloneDeep(item)
			this.detailData = detailDataCrash
			const parm = { roleId: item.id }
			this.oldCheckedMenu = []
			getAclList(parm).then((res) => {
				const oldCheckedMenuCrash = res.map((item, index) => {
					return item.aclId
				})
				console.log(oldCheckedMenuCrash)
				this.oldCheckedMenu = oldCheckedMenuCrash
			})
			this.detailFlag = true
		},
		changeAddUserFlag() {
			this.addUserFlag = false
		},
		changeInsertFlag() {
			this.insertFlag = false
		},
		toDetail(item) {
			this.detailData = item
			this.addUserFlag = true
		},
		toDel(id) {
			const parm = { id: id }
			roleDel(parm).then((res) => {
				this.$message({
					showClose: true,
					message: '操作成功',
					type: 'success'
				})
				this.insertFlag = false
				this.getTableData()
			})
		},
		closeDialog() {
			this.oldCheckedMenu = []
			this.detailData = {
				name: '',
				permissionType: '',
				remark: '',
				roleEncoding: '',
				id: ''
			}
		},
		toEdit(editFlag, item) {
			this.editFlag = editFlag
			let detailDataCrash = {}
			detailDataCrash = _.cloneDeep(item)
			this.detailData = detailDataCrash
			this.insertFlag = true
			// eslint-disable-next-line eqeqeq
			if (editFlag == 2) {
				const parm = { roleId: item.id }
				this.oldCheckedMenu = []
				getAclList(parm).then((res) => {
					const oldCheckedMenuCrash = res.map((item, index) => {
						return item.aclId
					})
					this.oldCheckedMenu = oldCheckedMenuCrash
				})
			}
		},
		setStatus(item) {
			const parm = {
				id: item.id,
				status: item.status
			}
			roleDisable(parm).then((res) => {
				this.$message({
					showClose: true,
					message: '操作成功',
					type: 'success'
				})
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		getTableData() {
			const param = this.searchForm
			roleList(param).then((res) => {
				console.log(res)
				const { records } = res
				const recordsCrash = records.map((item, index) => {
					item.createDate = moment(item.createDate).format(
						'YYYY-MM-DD HH:mm:ss'
					)
					return item
				})
				this.tableData = recordsCrash
			})
		},
		toInsert() {
			this.insertFlag = true
			this.editFlag = 0
		},
		back() {
			this.$router.push({ path: '/system' })
		}
	}
}
</script>

<style lang='scss'>
@import "~@/styles/variables.scss";
.clickCell {
    color: $theme;
    cursor: pointer;
}
.el-dialog__body {
    padding: 16px 20px;
}
.el-form-item {
    margin-bottom: 15px;
}
</style>
