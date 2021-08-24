/*
 * @Description: 通用模板页面
 * @Author: yzw
 * @Date: 2021-08-06 10:54:43
 * @LastEditTime: 2021-08-24 11:31:18
 * @LastEditors: yzw
 * @Reference:
 */

// template.js
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

        const template = `
<template>
    <el-container>
        <el-header height="auto">
            <searchForm ref="mainSearch" :searchoptions="searchOptions" @search="getData" />
        </el-header>
        <el-divider />
        ${insert.btn}
        <el-main class="basic-main">
            ${detail.component && `<detailDialog :id="checkId" ref="detail" />`}
            ${insert.component && `<insertDialog :id="checkId" ref="insert" :submit="getData" />`}
        </el-main>
    </el-container>
</template>
<script>
import { getData, deleteData } from '@/api/${config.name.split('/').pop()}'
import searchForm from '@/components/SearchForm'
${insert.import}
${detail.import}

export default {
    name: '${config.fileName}',
    components: {
        searchForm,
        ${detail.component && (detail.component + ',')}
        ${insert.component}
    },
    data() {
        return {
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
            paramObj: null, // 筛选项
            checkId: ''
        }
    },
    created() {
        this.getData()
    },
    mounted: function() {},
    methods: {
        getData() {
            // 解决未挂载完组件时调用子组件方法报错问题
            this.$nextTick(() => {
                const param = this.getParam()
                getData(param).then((res) => {
                    
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
            return param
        }
    }
}
</script>

<style lang='scss'>
@import "~@/styles/variables.scss";
</style>`
		return template
	}
}

