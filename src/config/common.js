/*
 * @Description: 通用数据/字典项数据
 * @Author: yzw
 * @Date: 2021-02-22 15:46:27
 * @LastEditTime: 2021-08-19 15:25:39
 * @LastEditors: yzw
 * @Reference:
 */

import moment from 'moment'

/**
 * @description: 文件路径前缀
 */
const fileUrl = '/rehabilitation/file/show/'

// 时间插件快捷日期数据
const datePickerOptions = {
	shortcuts: [
		{
			text: '昨天',
			onClick(picker) {
				const start = moment()
					.subtract(1, 'days')
					.format('YYYY-MM-DD')
				const end = moment()
					.subtract(1, 'days')
					.format('YYYY-MM-DD')
				picker.$emit('pick', [start, end])
			}
		},
		{
			text: '今天',
			onClick(picker) {
				const start = moment().format('YYYY-MM-DD')
				const end = moment().format('YYYY-MM-DD')
				picker.$emit('pick', [start, end])
			}
		},
		{
			text: '近三天',
			onClick(picker) {
				const start = moment()
					.subtract(3, 'days')
					.format('YYYY-MM-DD')
				const end = moment().format('YYYY-MM-DD')
				picker.$emit('pick', [start, end])
			}
		},
		{
			text: '本周',
			onClick(picker) {
				const start = moment()
					.weekday(1)
					.format('YYYY-MM-DD')
				const end = moment()
					.weekday(7)
					.format('YYYY-MM-DD')
				picker.$emit('pick', [start, end])
			}
		},
		{
			text: '本月',
			onClick(picker) {
				const start = moment().startOf('month')
				const end = moment().endOf('month')
				picker.$emit('pick', [start, end])
			}
		},
		{
			text: '本年',
			onClick(picker) {
				const start = moment().startOf('year')
				const end = moment().endOf('year')
				picker.$emit('pick', [start, end])
			}
		}
	]
}
// 时间插件快捷日期数据
const datetimePickerOptions = {
	shortcuts: [
		{
			text: '昨天',
			onClick(picker) {
				const start = moment()
					.subtract(1, 'days')
					.format('YYYY-MM-DD') + ' 00:00:00'
				const end = moment()
					.subtract(1, 'days')
					.format('YYYY-MM-DD') + ' 23:59:59'
				picker.$emit('pick', [start, end])
			}
		},
		{
			text: '今天',
			onClick(picker) {
				const start = moment().format('YYYY-MM-DD') + ' 00:00:00'
				const end = moment().format('YYYY-MM-DD') + ' 23:59:59'
				picker.$emit('pick', [start, end])
			}
		},
		{
			text: '近三天',
			onClick(picker) {
				const start = moment()
					.subtract(3, 'days')
					.format('YYYY-MM-DD') + ' 00:00:00'
				const end = moment().format('YYYY-MM-DD') + ' 23:59:59'
				picker.$emit('pick', [start, end])
			}
		},
		{
			text: '本周',
			onClick(picker) {
				const start = moment()
					.weekday(1)
					.format('YYYY-MM-DD') + ' 00:00:00'
				const end = moment()
					.weekday(7)
					.format('YYYY-MM-DD') + ' 23:59:59'
				picker.$emit('pick', [start, end])
			}
		},
		{
			text: '本月',
			onClick(picker) {
				const start = moment().startOf('month') + ' 00:00:00'
				const end = moment().endOf('month') + ' 23:59:59'
				picker.$emit('pick', [start, end])
			}
		},
		{
			text: '本年',
			onClick(picker) {
				const start = moment().startOf('year') + ' 00:00:00'
				const end = moment().endOf('year') + ' 23:59:59'
				picker.$emit('pick', [start, end])
			}
		}
	]
}

const pageSizes = [20, 30, 50, 100]

const common = {
	datePickerOptions,
	datetimePickerOptions,
	fileUrl,
	pageSizes
}

export default common
