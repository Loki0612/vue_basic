/* eslint-disable no-undef */
/* eslint-disable no-undef */
<!--
 * @Description:表格搜索表单
 * @Author: yzw
 * @Date: 2021-08-11 15:34:45
 * @LastEditTime: 2021-08-23 16:03:26
 * @LastEditors: yzw
 * @Reference:
-->

<template>
  <el-form
    ref="searchForm"
    :model="searchData"
    :inline="true"
    class="searchForm"
  >
    <template v-for="item in searchoptions">
      <el-form-item :key="item.key" :label="item.label" :prop="item.key">
        <el-input
          v-if="item.type === 'input'"
          v-model="searchData[item.key]"
          :placeholder="item.placeholder || '请输入'"
          clearable
          maxlength="20"
        />
        <el-select
          v-if="item.type === 'select'"
          v-model="searchData[item.key]"
          clearable
          :placeholder="item.placeholder || '请选择'"
          :filterable="item.filterable || true"
          :multiple="item.multiple || false"
          :collapse-tags="item.multiple || false"
        >
          <el-option
            v-for="option in item.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-date-picker
          v-if="item.type === 'datetimerange'"
          v-model="searchData[item.key]"
          type="datetimerange"
          :clearable="true"
          :picker-options="datetimePickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          range-separator="--"
          :start-placeholder="item.startPlaceholder || '开始时间'"
          :end-placeholder="item.endPlaceholder || '结束时间'"
          value-format="yyyy-MM-dd HH:mm:ss"
          :editable="false"
        />
        <el-date-picker
          v-if="item.type === 'daterange'"
          v-model="searchData[item.key]"
          type="daterange"
          :picker-options="datePickerOptions"
          range-separator="--"
          :start-placeholder="item.startPlaceholder || '开始日期'"
          :end-placeholder="item.endPlaceholder || '结束日期'"
          value-format="yyyy-MM-dd"
          :editable="false"
        />
        <el-time-picker
          v-if="item.type === 'timerange'"
          v-model="searchData[item.key]"
          is-range
          range-separator="--"
          :start-placeholder="item.startPlaceholder || '开始时间'"
          :end-placeholder="item.endPlaceholder || '结束时间'"
          value-format="HH:mm:ss"
          :editable="false"
        />
      </el-form-item>
    </template>
    <div class="search-btn-group">
      <el-form-item>
        <el-button type="primary" @click="searchForm">
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          plain
          @click="resetForm"
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
</template>

<script>

export default {
	name: 'SearchForm',
	remark: '搜索组件,用于表格头部',
	props: {
		searchoptions: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			datePickerOptions: this.common.datePickerOptions, // 日期选择器扩展项
			datetimePickerOptions: this.common.datetimePickerOptions, // 日期时间选择器扩展项
      searchData: {}
		}
	},
	created() {
      // 默认值带入
      const paramData = {}
      _.map(this.searchoptions, (item) => {
        if (item.defaultVal !== null && item.defaultVal !== undefined) {
          paramData[item.key] = item.defaultVal
        }
      })
      this.searchData = paramData
	},
  methods: {
    searchForm() {
      const data = this.packageData()
      console.log(`searchForm:`, data)
      this.$emit('search', data)
    },
    // 封装数据
    packageData() {
      const data = {}
      // 深拷贝对象
      _.defaultsDeep(data, this.searchData)
      const dateList = _.filter(this.searchoptions, (o) => { return (o.type === 'datetimerange' || o.type === 'daterange' || o.type === 'timerange') })
      if (dateList.length === 1 && dateList.length > 0) {
          // 若时间选择器只有一个的时候 字段默认变更为startTime & endTime
          const key = dateList[0].key
          data.startTime = data[key][0]
          data.endTime = data[key][1]
          delete data[key]
      } else {
        // 若时间选择器只有一个的时候 字段默认变更为 key + startTime & key + endTime
        _.map(dateList, (item) => {
          const key = item.key
          data[`${key}StartTime`] = data[key][0]
          data[`${key}EndTime`] = data[key][1]
          delete data[key]
        })
      }
      return data
    },
    resetForm() {
      // this.$refs['searchForm'].resetFields()
      const resetData = {}
      _.forIn(this.searchData, function(value, key) {
        resetData[key] = ''
      })
      this.searchData = resetData
      console.log(this.searchData)
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
