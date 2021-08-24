<!--
 * @Description: 模板详情
 * @Author: yzw
 * @Date: 2021-08-13 10:03:22
 * @LastEditTime: 2021-08-20 10:39:03
 * @LastEditors: yzw
 * @Reference:
-->
<template>
  <section>
    <el-table
      ref="mainTable"
      v-tableHeight="{bottomOffset:100}"
      :data="tableData"
      style="width: 100%"
      stripe
      border
      highlight-current-row
      :row-key="getRowKey"
      tooltip-effect="light"
      :height="tableHeight"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @current-change="handleSelectionChange"
    >
      <el-table-column
        v-if="config.selection === 'multiple'"
        type="selection"
        width="55"
        align="center"
        :resizable="false"
      />
      <el-table-column
        v-if="config.index"
        type="index"
        label="序号"
        width="50"
        align="center"
        :resizable="false"
      />

      <template v-for="item in config.column">
        <el-table-column
          v-if="item.slot"
          :key="item.prop"
          :label="item.label"
          :align="config.align || 'center'"
          :fixed="item.slot == 'handle' ? 'right' : item.fixed"
          :width="item.width"
          :resizable="false"
        >
          <template slot-scope="scope">
            <slot :name="item.slot" :data="scope" />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :align="config.align || 'center'"
          :fixed="item.fixed"
          :width="item.width"
          :sortable="item.sortable || true"
          :resizable="false"
          :formatter="item.formatter"
          :show-overflow-tooltip="true"
        />
      </template>
    </el-table>
    <el-pagination
      v-if="config.pagination || true"
      background
      :current-page="pageNo"
      :page-sizes="common.pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total"
      style="float:right;margin-top:15px;padding-right:0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </section>
</template>

<script>

export default {
	name: 'Temp',
    props: {
        tableData: {
          type: Array,
          required: true
        },
        config: {
          type: Object,
          required: true
        },
        total: {
          type: Number,
          required: true
        }
    },
	data() {
		return {
        tableHeight: 500,
        tableChecked: [], // 表格选中内容
        pageNo: 1,
        pageSize: 10
		}
	},
	created() {
    // window.addEventListener('resize', this.getHeight)
  },
	mounted: function() {
    // this.getHeight()
  },
  destroyed() {
    // window.removeEventListener('resize', this.getHeight)
  },
	methods: {
    // 页面条数
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNo = 1
      this.$emit('updatePage')
    },
    // 页码
    handleCurrentChange(val) {
      this.pageNo = val
      this.$emit('updatePage')
    },
    // 点击复选框触发，复选框样式的改变
    handleSelectionChange(val) {
        this.tableChecked = val
    },
    // 点击行触发，选中或不选中复选框/单选
    handleRowClick(row, column, event) {
        if (this.config.selection === 'multiple') {
          this.$refs.mainTable.toggleRowSelection(row)
        } else if (this.config.selection === 'single') {
          this.$refs.mainTable.setCurrentRow(row)
        }
    },
    getPage() {
      // 获取page对象
      return {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    },
    tableRowClassName({ row, index }) {
      if (row.className) {
        return row.className
      } else {
        return ''
      }
    },
    getRowKey(row) {
        return row.id
    },
    // 获取页面高度
    getHeight() {
        const offsetbottom = 100
        this.tableHeight = window.innerHeight - this.$refs['mainTable'].$el.offsetTop - offsetbottom
        console.log('TABLE_HEIGHT', this.tableHeight)
    }
	}
}
</script>

<style lang='scss'>
@import "~@/styles/variables.scss";
</style>
