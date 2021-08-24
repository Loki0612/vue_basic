<!--
 * @Description: 机构管理
 * @Author: yzw
 * @Date: 2021-02-03 10:49:05
 * @LastEditTime: 2021-08-16 16:46:18
 * @LastEditors: yzw
 * @Reference:
-->

<template>
  <el-scrollbar style="height: 100%; width: 100%">
    <el-container>
      <el-header height="auto">
        <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="机构管理" name="organization">
            <el-button
              style="margin-bottom:10px"
              type="success"
              @click="insertFlag = true;insertType = true;"
            >
              新增
            </el-button>
            <el-table
              ref="mainTable"
              :data="tableData"
              style="width: 100%"
              border
              highlight-current-row
              row-key="id"
              :loading="loading"
              default-expand-all
              :tree-props="{
                children: 'children',
                hasChildren: 'hasChildren',
              }"
            >
              <el-table-column
                prop="name"
                label="机构名称"
                width="250"
                align="left"
              >
                <template slot-scope="scope">
                  <span class="clickCell" @click="nameClick(scope.row)">
                    {{ scope.row.name }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="deptType"
                label="机构类型"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <span>
                    {{ changeDeptType[scope.row.deptType] }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="parentName"
                label="上级机构"
                width="100"
                align="center"
              />
              <el-table-column
                class-username="status-col"
                align="center"
                label="禁用/启用"
                width="100"
              >
                <template v-if="scope.$index!=0" slot-scope="scope">
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
              >
                <template v-if="scope.$index!=0" slot-scope="scope">
                  <span>
                    {{ changeTime(scope.row.createDate) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                class-username="status-col"
                align="center"
                label="操作"
                width="350"
                fixed="right"
              >
                <template v-if="scope.$index!=0" slot-scope="scope">
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
                    :disabled="scope.row.status==1"
                    @click="insertChild(scope.row)"
                  >新增子级</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    plain
                    style="margin-right: 10px"
                    @click="adduser(scope.row)"
                  >分配用户</el-button>
                  <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    icon="el-icon-info"
                    icon-color="red"
                    title="请确认是否删除此条数据？"
                    @confirm="delOrg(scope.row.id)"
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
          </el-tab-pane>
          <el-tab-pane label="组织架构树" name="organizationTree">
            <el-row type="flex" justify="center">
              <tree :chart-data="treeData" />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-header>
      <insertDialog
        :detail-data="detailData"
        :insert-flag="insertFlag"
        :table-data="tableData"
        :dept_type="dept_type"
        :insert-type="insertType"
        @closeDialog="closeDialog"
        @changeInsertFlag="changeInsertFlag"
        @getTableData="getTableData"
      />
      <addUserDialog
        :detail-data="detailData"
        :add-user-flag="addUserFlag"
        :change-dept-type="changeDeptType"
        @changeAddUserFlag="changeAddUserFlag"
      />
      <detailDialog
        :detail-data="detailData"
        :detail-flag="detailFlag"
        :table-data="tableData"
        :change-dept-type="changeDeptType"
        @changeDetailFlag="changeDetailFlag"
      />
    </el-container>
  </el-scrollbar>
</template>

<script>
import { orgList, orgDel, orgDisable, getDeptTree } from '@/api/organization'
import { getDict } from '@/api/common'
import tree from '@/components/tree'
import insertDialog from '@/views/system/organization/insertDialog'
import addUserDialog from '@/views/system/organization/addUserDialog'
import detailDialog from '@/views/system/organization/detailDialog'
export default {
    name: 'Organization',
    components: {
        tree,
        insertDialog,
        addUserDialog,
        detailDialog
    },
    data() {
        return {
            activeName: 'organization',
            tableData: [],
            loading: false,
            typeList: ['', '一级菜单', '功能按钮', '其他', '二级菜单'],
            insertFlag: false,
            detailData: {
                name: '',
				remark: '',
				parentId: '',
                deptType: '',
                sort: '',
				deptHeads: '',
				deptHeadsPhone: '',
				id: ''
            },
            insertType: true,
			dept_type: [],
            changeDeptType: [],
            treeData: {},
            backgroundColorList: ['', '#469cf8', '#92c2f4', '#63ba2d', '#8bc566', '#efbb62'],
            addUserFlag: false,
            detailFlag: false
        }
    },
    created() {
		this.getTypeDict()
        this.getTableData()
        this.getTree()
    },
    mounted() {},
    methods: {
        changeDetailFlag() {
            this.detailFlag = false
        },
        nameClick(item) {
            let detailDataCrash = {}
            detailDataCrash = _.cloneDeep(item)
            this.detailData = detailDataCrash
            this.detailFlag = true
        },
        changeTab(tab) {
            if (tab.name == 'organizationTree') {
                this.getTree()
            }
        },
        adduser(item) {
            let detailDataCrash = {}
            detailDataCrash = _.cloneDeep(item)
            this.detailData = detailDataCrash
			this.addUserFlag = true
        },
        changeAddUserFlag() {
            this.addUserFlag = false
        },
        changeInsertFlag() {
            this.insertFlag = false
        },
        changeObj(oldArr) {
            if (oldArr && oldArr.length > 0) {
                const newObj = oldArr.map((item, index) => {
                    return ({
                        label: {
                            backgroundColor: '#F4F4F4',
                            borderRadius: [5, 5, 5, 5],
                            height: 40,
                            formatter: '{first|' + item.name + '}{second|' + item.userCount + '人}',
                            rich: {
                                first: {
                                    backgroundColor: this.backgroundColorList[item.deptType],
                                    color: '#fff',
                                    align: 'center',
                                    minWidth: 100,
                                    height: 40,
                                    borderRadius: [5, 0, 0, 5],
                                    padding: [0, 15, 0, 15]
                                },
                                second: {
                                    color: '#666',
                                    align: 'center',
                                    lineHeight: 17,
                                    padding: [0, 5, 0, 5]
                                }
                            }
                        },
                        children: this.changeObj(item.children)
                    })
                })
                return newObj
            } else {
                return []
            }
        },
        getTree() {
            getDeptTree().then(res => {
                const treeCrash = this.changeObj(res)
                this.treeData = treeCrash[0]
            })
        },
		getTypeDict() {
			const parm = {
				type: 'dept_type'
				}
			getDict(parm).then((res) => {
				this.dept_type = res.dept_type
                const changeDeptTypeCrash = []
                res.dept_type.map((item, index) => {
                    changeDeptTypeCrash[item.value] = item.label
                })
                this.changeDeptType = changeDeptTypeCrash
			})
		},
        insertChild(item) {
            this.insertFlag = true
            this.insertType = true
            this.detailData.parentId = item.id
        },
        closeDialog() {
            this.detailData = {
                name: '',
				remark: '',
				parentId: '',
                deptType: '',
                sort: '',
				deptHeads: '',
				deptHeadsPhone: '',
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
            orgList().then((res) => {
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
            orgDisable(parm).then((res) => {
                this.$message({
                    showClose: true,
                    message: '操作成功',
                    type: 'success'
                })
            })
        },
        delOrg(deptId) {
            const parm = {
                id: deptId
            }
            orgDel(parm).then((res) => {
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
