<!--
 * @Description: 角色管理
 * @Author: yzw
 * @Date: 2021-02-03 10:49:05
 * @LastEditTime: 2021-08-11 15:38:39
 * @LastEditors: yzw
 * @LastEditTime: 2021-03-16 15:17:46
 * @LastEditors: Richardlv
 * @Reference:
-->

<template>
  <el-scrollbar style="height: 100%; width: 100%">
    <el-container>
      <el-header height="auto" />
      <el-row class="table-btn-group">
        <el-button type="success" style="margin-top:10px" @click="insertFlag = true;insertType = true">新增</el-button>
      </el-row>
      <el-main class="basic-main">
        <el-table
          ref="mainTable"
          :data="tableData"
          style="width: 100%"
          border
          highlight-current-row
          row-key="id"
          :loading="loading"
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column
            prop="name"
            label="菜单名称"
            align="left"
          >
            <template slot-scope="scope">
              <span class="clickCell" @click="nameClick(scope.row)">
                {{ scope.row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span>
                {{ typeList[scope.row.type] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            width="100"
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
            width="180"
            header-align="center"
          >
            <template slot-scope="scope">
              <span>
                {{ changeTime(scope.row.createDate) }}
              </span>
            </template>
          </el-table-column>
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
                @click="edit(scope.row)"
              >编辑</el-button>
              <el-button
                type="primary"
                size="mini"
                plain
                style="margin-right: 10px"
                :disabled="scope.row.status==1"
                @click="insertChild(scope.row)"
              >新增子级</el-button>
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                title="请确认是否删除此条数据？"
                @confirm="delMenu(scope.row.id)"
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
        :table-data="tableData"
        :insert-type="insertType"
        @closeDialog="closeDialog"
        @changeInsertFlag="changeInsertFlag"
        @getTableData="getTableData"
      />
      <detailDialog
        :detail-data="detailData"
        :detail-flag="detailFlag"
        :table-data="tableData"
        @changeDetailFlag="changeDetailFlag"
      />
    </el-container>
  </el-scrollbar>
</template>

<script>
import { menuList, menuDisable, menuInsert, menuDel, menuInfo, menuEdit } from '@/api/menu'
import _ from 'lodash'
import moment from 'moment'
import insertDialog from '@/views/system/menu/insertDialog'
import detailDialog from '@/views/system/menu/detailDialog'
export default {
  name: 'MenuList',
  components: {
    insertDialog,
    detailDialog
  },
  data() {
    return {
      tableData: [],
      loading: false,
      typeList: ['', '一级菜单', '功能按钮', '其他', '二级菜单'],
      insertFlag: false,
      detailData: {
        name: '',
        type: '',
        component: '',
        path: '',
        parentId: '',
        sort: '',
        permission: '',
        status: '',
        icon: '',
        remark: '',
        breadcrumb: '',
        hidden: '',
        keepAlive: '',
        pageName: '',
        id: ''
      },
      insertType: true,
      detailFlag: false
    }
  },
  created() {
    this.getTableData()
  },
  mounted() {},
  methods: {
    nameClick(item) {
      let detailDataCrash = {}
      detailDataCrash = _.cloneDeep(item)
      this.detailData = detailDataCrash
      this.detailFlag = true
    },
    changeDetailFlag() {
      this.detailFlag = false
    },
    changeInsertFlag() {
      this.insertFlag = false
    },
    insertChild(item) {
      this.insertFlag = true
      this.insertType = true
      this.detailData.parentId = item.id
    },
    closeDialog() {
      this.detailData = {
        name: '',
        type: '',
        component: '',
        path: '',
        parentId: '',
        sort: '',
        permission: '',
        status: '',
        icon: '',
        remark: '',
        breadcrumb: '',
        hidden: '',
        keepAlive: '',
        pageName: '',
        id: ''
      }
    },
    edit(item) {
      let detailDataCrash = {}
      detailDataCrash = _.cloneDeep(item)
      this.detailData = detailDataCrash
      this.insertFlag = true
      this.insertType = false
    },
    getTableData() {
      menuList().then((res) => {
        console.log(res)
        this.tableData = res
      })
    },
    changeTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    setStatus(item) {
      const parm = {
        id: item.id,
        status: item.status
      }
      menuDisable(parm).then((res) => {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
      })
    },
    delMenu(id) {
      const parm = {
        id: id
      }
      menuDel(parm).then((res) => {
        this.getTableData()
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "~@/styles/variables.scss";
.clickCell {
  color: $theme;
  cursor: pointer;
}
</style>
