/*
 * @Description: 新增、修改模板页面
 * @Author: yzw
 * @Date: 2021-08-06 10:54:43
 * @LastEditTime: 2021-08-24 11:47:09
 * @LastEditors: yzw
 * @Reference:
 */

// template.js
module.exports = {
	template: config => {
        const template = `
<template>
    <el-dialog
        width="78%"
        :title="id === '' ? '新增${config.remark}' : '修改${config.remark}'"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
    >
        <el-form
        ref="insertForm"
        :model="form"
        label-position="right"
        label-width="120px"
        class="formBox"
        :rules="rules"
        size="medium"
        >
        <el-row>
            <el-col :sm="{span:12}" :xl="{span:8}">
            <el-form-item label="活动名称" prop="name">
                <el-input
                v-model="form.name"
                placeholder="请输入"
                clearable
                maxlength="20"
                />
            </el-form-item>
            </el-col>
            <el-col :sm="{span:12}" :xl="{span:8}">
            <el-form-item label="角色单选" prop="select">
                <el-select
                v-model="form.select"
                clearable
                placeholder="请选择"
                :filterable="true"
                style="width:100%"
                >
                <el-option
                    v-for="option in options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                />
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :sm="{span:12}" :xl="{span:8}">
            <el-form-item label="角色多选" prop="select2">
                <el-select
                v-model="form.select2"
                clearable
                placeholder="请选择"
                :filterable="true"
                :multiple="true"
                :collapse-tags="true"
                style="width:100%"
                >
                <el-option
                    v-for="option in options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                />
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :sm="{span:12}" :xl="{span:8}">
            <el-form-item label="固定时间点(开始)" prop="fixedStartTime">
                <el-time-select
                v-model="form.fixedStartTime"
                :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                }"
                placeholder="选择时间"
                clearable
                style="width:100%"
                />
            </el-form-item>
            </el-col>
            <el-col :sm="{span:12}" :xl="{span:8}">
            <el-form-item label="固定时间点(结束)" prop="fixedEndTime">
                <el-time-select
                v-model="form.fixedEndTime"
                :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                    minTime: form.fixedStartTime
                }"
                placeholder="选择时间"
                clearable
                style="width:100%"
                />
            </el-form-item>
            </el-col>
            <el-col :sm="{span:12}" :xl="{span:8}">
            <el-form-item label="日期" prop="date">
                <el-date-picker
                v-model="form.date"
                type="daterange"
                :picker-options="datePickerOptions"
                range-separator="--"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :editable="false"
                style="width:100%"
                />
            </el-form-item>
            </el-col>
            <el-col :sm="{span:12}" :xl="{span:8}">
            <el-form-item label="状态" prop="status">
                <el-switch
                v-model="form.status"
                name="status"
                active-text="启用"
                inactive-text="禁用"
                inactive-value="0"
                active-value="1"
                />
            </el-form-item>
            </el-col>
            <el-col :sm="{span:12}" :xl="{span:8}">
            <el-form-item label="计数器" prop="number">
                <el-input-number v-model="form.number" name="number" :min="1" :max="99" label="计数器" style="width:150px" />
            </el-form-item>
            </el-col>
            <el-col :sm="{span:12}" :xl="{span:8}">
            <el-form-item label="单选框组" prop="radio">
                <el-radio-group v-model="form.radio">
                <el-radio :label="3">备选项</el-radio>
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
                </el-radio-group>
            </el-form-item>
            </el-col>
            <el-col :sm="{span:12}" :xl="{span:8}">
            <el-form-item label="多选框组" prop="checkbox">
                <el-checkbox-group v-model="form.checkbox">
                <el-checkbox label="复选框 A" />
                <el-checkbox label="复选框 B" />
                <el-checkbox label="复选框 C" />
                <el-checkbox label="禁用" disabled />
                <el-checkbox label="选中且禁用" disabled />
                </el-checkbox-group>
            </el-form-item>
            </el-col>
        </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="updateVisible(false)">取 消</el-button>
            <el-button type="primary" @click="submit()">提 交</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { insertData, editData } from '@/api/${config.name.split('/').pop()}'
export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        rules: {
            name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
                { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
        },
        options: [
            {
                value: '1',
                label: '角色1'
            },
            {
                value: '2',
                label: '角色2'
            },
            {
                value: '3',
                label: '角色3'
            },
            {
                value: '4',
                label: '角色4'
            },
            {
                value: '5',
                label: '角色5'
            }
        ],
        form: {
            checkbox: []
        },
        visible: false,
        datePickerOptions: this.common.datePickerOptions // 日期选择器扩展项
        }
    },
    created() {},
    mounted() {},
    methods: {
        getTableData() {
            this.$emit('getTableData')
        },
        submit() {
        this.$refs.insertForm.validate((valid) => {
            if (valid) {
            const parm = this.form
            if (parm.id === '') {
                insertData(parm).then((res) => {
                this.submitSuccess(res)
                })
            } else {
                editData(parm).then((res) => {
                this.submitSuccess(res)
                })
            }
            }
        })
        },
        submitSuccess(res) {
            this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
            })
            this.updateVisible(false)
            this.$emit('submit')
        },
        updateVisible(val) {
            this.visible = val
        }
    }
}
</script>
<style scoped>
</style>
      
        `
        return template
    }
}
