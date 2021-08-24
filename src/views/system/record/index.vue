<!--
 * @Description: 系统日志
 * @Author: yzw
 * @Date: 2021-02-03 10:49:05
 * @LastEditTime: 2021-08-11 15:55:23
 * @LastEditors: yzw
 * @Reference:
-->

<template>
  <el-scrollbar style="height:100%;width:100%">
    <el-container>
      <el-header height="auto">
        <el-form
          ref="searchForm"
          :inline="true"
          :model="searchForm"
          class="searchForm"
        >
          <el-form-item label="操作人" prop="trueName">
            <el-input
              v-model="searchForm.trueName"
              placeholder="请输入操作人..."
              clearable
            />
          </el-form-item>
          <el-form-item label="时间" prop="startTime">
            <el-date-picker
              v-model="searchForm.date"
              type="datetimerange"
              :clearable="false"
              :picker-options="pickerOptions"
              range-separator="--"
              start-placeholder="选择开始时间"
              end-placeholder="选择结束时间"
            />
          </el-form-item>

          <div class="search-btn-group">
            <el-form-item>
              <el-button type="primary" @click="search('searchForm')">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                plain
                @click="resetForm('searchForm')"
              >重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="default"
                @click="back()"
              >返回</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-header>
      <el-divider />
      <el-main class="basic-main">
        <el-table
          ref="mainTable"
          :data="tableData"
          style="width: 100%"
          border
          highlight-current-row
          row-key="id"
          :loading="loading"
        >

          <!-- 操作人 executorUser	执行人	string	 -->
          <el-table-column
            prop="executorUser"
            label="操作人"
            min-width="150"
            align="center"
          />
          <!-- 操作时间 executorTime	执行时间	string(date-time) -->
          <el-table-column
            prop="executorTime"
            label="操作时间"
            min-width="150"
            align="center"
            :formatter="dateFormat"
          />
          <!-- 操作设备 executorDevice	执行设备	string	 -->
          <el-table-column
            prop="executorDevice"
            label="操作设备"
            min-width="200"
            align="center"
          />
          <!--
          methodName	执行请求的方法	string
          paramJson	参数	string
          sqlInfo	sql信息	string
         -->
          <!-- 执行请求的方法 methodName	执行请求的方法	string		 -->
          <el-table-column
            prop="methodName"
            label="执行请求的方法"
            align="center"
            min-width="200"
            :show-overflow-tooltip="true"
          />
          <!-- 参数 paramJson	参数	string		 -->
          <el-table-column
            prop="paramJson"
            label="参数"
            align="center"
            min-width="200"
            :show-overflow-tooltip="true"
          />
          <!-- sql信息 sqlInfo	sql信息	string		 -->
          <el-table-column
            prop="sqlInfo"
            label="sql信息"
            align="center"
            min-width="200"
            :show-overflow-tooltip="true"
          />
          <!-- 操作  -->
          <el-table-column
            class-username="status-col"
            align="center"
            label="操作"
            min-width="100"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                plain
                style="margin-right:15px"
                @click="toDetail(scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer class="paginationBox" height="72px">
        <el-pagination
          :current-page="pageNo"
          :page-sizes="common.pageSizes"
          :page-size="pageSize"
          background
          layout="total, sizes, prev, pager, next"
          :total="totalNum"
        />
      </el-footer>
      <myDialog :dialog-title="dialogTitle" :dialog-visible="dialogVisible" :form="form" @show="showDialog" />
    </el-container>
  </el-scrollbar>
</template>

<script>
import { getRecordList } from '@/api/record'
import moment from 'moment'
import common from '@/config/common'
import myDialog from '@/views/system/record/dialog'
export default {
	name: 'Record',
	components: {
		myDialog
	},
	data() {
		return {
			pickerOptions: common.datepickerOptions,
			searchForm: {
				trueName: '',
				date: []
			},
			pageNo: 1, // 页码
			pageSize: 10, // 显示数量
			totalNum: 0, // 总条数
			tableData: [], // 表格数据
			dialogTitle: '日志详情',
			loading: false,
			dialogVisible: false,
			/*
        executorDevice	执行设备	string
          executorTime	执行时间	string(date-time)
          executorUser	执行人	string
          methodName	执行请求的方法	string
          paramJson	参数	string
          sqlInfo	sql信息	string
        */
			form: {
				executorDevice: '',
				executorTime: '',
				executorUser: '',
				methodName: '',
				paramJson: '',
				sqlInfo: ''
			}
		}
	},
	created() {

	},
	mounted() {
		this.getTableData()
	},
	methods: {
		dateFormat(row, column) {
			const date = row[column.property]
			return date ? moment(date).format('YYYY-MM-DD') : ''
		},
		getTableData() {
			const info = this.searchForm
			if (this.searchForm.date.length === 2) {
				console.log(moment(this.searchForm.date[0]).unix())
				// endDate	结束时间	query	false	string(date-time)
				// startDate	开始时间	query	false	string(date-time)
				info.startDate = moment(this.searchForm.date[0]).unix().toString() + '000'
				info.endDate = moment(this.searchForm.date[1]).unix().toString() + '000'
			} else {
				info.startDate && delete info.startDate
				info.endDate && delete info.endDate
			}
			const param = Object.assign(info, {
				current: this.pageNo,
				size: this.pageSize
			})
			console.log('param', param)
			getRecordList(param).then((res) => {
				const { total, records } = res
				this.tableData = records
				this.totalNum = parseInt(total)
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
			if (formName === 'searchForm') {
				this.searchForm.date = []
			}
		},
		showDialog(ifShow) {
			this.dialogVisible = ifShow
		},
		toDetail(row) {
			if (row) {
				this.form.id = row.id
				/*
          executorDevice	执行设备	string
          executorTime	执行时间	string(date-time)
          executorUser	执行人	string
          methodName	执行请求的方法	string
          paramJson	参数	string
          sqlInfo	sql信息	string

        */
				const { executorDevice, executorTime, executorUser, methodName, paramJson, sqlInfo } = row
				this.form = {
					executorDevice,
					executorTime,
					executorUser,
					methodName,
					paramJson,
					sqlInfo
				}
			}
			this.dialogVisible = true
		},
		back() {
			this.$router.push({ path: '/system' })
		},
		search() {
			this.getTableData()
		}
	}
}
</script>

<style lang='scss' scoped>
</style>
