/*
 * @Description: 表格模板页面
 * @Author: yzw
 * @Date: 2021-08-10 17:20:46
 * @LastEditTime: 2021-08-24 11:29:49
 * @LastEditors: yzw
 * @Reference:
 */

module.exports = {
    template: config => {
        let insert = {
            import: ``,
            btn: ``,
            component: ``
        }
        let detail = {
            import: ``,
            btn: ``,
            component: ``
        }
        if (config.dialog.includes('add')) {
            insert = {
                import: `import insertDialog from '@/views/${config.name}/insertDialog'`,
                btn: `<el-row class="table-btn-group"><el-button type="primary" @click="toInsert()">新增</el-button></el-row>`,
                component: `insertDialog`
            }
        }

        if (config.dialog.includes('add')) {
            detail = {
                import: `import detailDialog from '@/views/${config.name}/detailDialog'`,
                btn: ``,
                component: `detailDialog`
            }
        }
        const temp = `
<!--
* @Description: ${config.remark}页面
* @Reference:
-->

<template>
<el-container>
    <el-header height="auto">
        <searchForm ref="mainSearch" :searchoptions="searchOptions" @search="search" />
    </el-header>
    <el-divider />
    ${insert.btn}
    <el-main class="basic-main">
    <generalTable ref="mainTable" :table-data="tableData" :config="tableConfig" :total="total" @updatePage="getList">
        <template slot="handle" slot-scope="scope">
        <el-button type="text" @click="toDetail(scope)">详情</el-button>
        <el-button type="text" style="margin-right: 10px" @click="toEdit(scope.row.id)">编辑</el-button>
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
            type="text"
            >删除</el-button>
        </el-popconfirm>
        </template>
    </generalTable>
    ${detail.component && `<detailDialog :id="checkId" ref="detail" />`}
    ${insert.component && `<insertDialog :id="checkId" ref="insert" :submit="search" />`}
    </el-main>
</el-container>
</template>

<script>
import { getList, deleteData } from '@/api/${config.name.split('/').pop()}'
import searchForm from '@/components/SearchForm'
import generalTable from '@/components/Table'
${insert.import}
${detail.import}

export default {
    name: '${config.fileName}',
    components: {
        searchForm,
        generalTable,
        ${detail.component && `${detail.component},`}
        ${insert.component}
    },
    data() {
        return {
            tableData: [],
            searchOptions: [
                {
                    type: 'input',
                    placeholder: '请输入',
                    key: 'name',
                    label: '姓名',
                    defaultVal: ''
                },
                {
                    type: 'select',
                    placeholder: '请选择',
                    key: 'role',
                    filterable: true,
                    multiple: true,
                    label: '多选',
                    options: [
                        {
                            value: '1',
                            label: '内容1'
                        },
                        {
                            value: '2',
                            label: '内容2'
                        },
                        {
                            value: '3',
                            label: '内容3'
                        },
                        {
                            value: '4',
                            label: '内容4'
                        },
                        {
                            value: '5',
                            label: '内容5'
                        }
                    ],
                    defaultVal: []
                },
                {
                    type: 'daterange',
                    startPlaceholder: '开始日期',
                    endPlaceholder: '结束日期',
                    key: 'date',
                    label: '日期',
                    defaultVal: []
                },
            ],
            tableConfig: {
                align: 'center', // 不必填 默认为center
                selection: 'normal', // 不必填 多选: multiple  单选: single  默认为 normal
                index: true, // 不必填 序号
                pagination: true, // 不必填 分页 默认为true
                column: [
                {
                    label: '内容', // 必填
                    prop: 'name', // 必填
                    // formatter: (row, column) => {
                    //     return row.archivesInfoId.name
                    // }
                },
                {
                    slot: 'handle', // 不必填 单列插槽
                    label: '操作', // 必填
                    fixed: 'right', // 不必填 固定列  left right
                    width: '220' // 不必填
                }
                ]
            },
            paramObj: null, // 筛选项
            total: 0, // 总条数
            checkId: '' // 单条数据id 用于详情或编辑请求数据用
        }
    },
    created() {
        this.getList()
    },
    mounted: function() {},
    methods: {
        search(data) {
            this.paramObj = data
            this.$refs.mainTable.handleCurrentChange(1)
        },
        getList() {
            // 解决未挂载完组件时调用子组件方法报错问题
            this.$nextTick(() => {
                const param = this.getParam()
                getList(param).then((res) => {
                    this.tableData = res
                })
            })
        },
        toInsert() {
            this.checkId = ''
            this.$refs.insert.updateVisible(true)
        },
        toDetail(scope) {
            this.checkId = scope.data.row.id
            this.$refs.detail.updateVisible(true)
        },
        toEdit(scope) {
            this.checkId = scope.data.row.id
            this.$refs.insert.updateVisible(true)
        },
        toDel(id) {
            const param = { id }
            deleteData(param).then(res => {
                this.$message({
                message: '删除成功',
                type: 'success'
                })
            })
        },
        getParam() {
            // 获取参数
            const paramObj = this.$refs.mainSearch.packageData()
            this.paramObj = paramObj
            const page = this.$refs.mainTable.getPage()
            const param = Object.assign(page, paramObj)
            return param
        }
    }
}
</script>

<style lang='scss'>
@import "~@/styles/variables.scss";
</style>

        `
        return temp
    }
}
