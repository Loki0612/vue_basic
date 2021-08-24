<!--
 * @LastEditors: yzw
 * @Author: Richardlv
-->

<template>
  <el-dialog
    width="60%"
    title="新增菜单"
    :visible.sync="insertFlag"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @close="closeDialog()"
  >
    <el-form
      ref="detailData"
      :model="detailData"
      label-position="right"
      class="formBox"
      label-width="120px"
      :rules="insertRules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构名称" prop="name" class="formItem">
            <el-input v-model="detailData.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort" class="formItem">
            <el-input v-model="detailData.sort" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="上级机构" prop="parentId" class="formItem">
            <el-cascader
              v-model="detailData.parentId"
              :options="tableData"
              :props="{
                checkStrictly: true,
                label: 'name',
                value: 'id',
              }"
              clearable
              filterable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" prop="deptType" class="formItem">
            <el-select
              v-model="detailData.deptType"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in dept_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="负责人" prop="deptHeads" class="formItem">
            <el-input v-model="detailData.deptHeads" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="deptHeadsPhone" class="formItem">
            <el-input
              v-model="detailData.deptHeadsPhone"
              type="tel"
              maxlength="11"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark" class="formItem">
            <el-input v-model="detailData.remark" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeInsertFlag">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { orgUpdate, orgInsert } from '@/api/organization'
export default {
  props: {
    tableData: Array,
    dept_type: Array,
    insertFlag: Boolean,
    detailData: Object,
    insertType: Boolean
  },
  data() {
    return {
      insertRules: {
        name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 3, message: '至少需要 3 个字符', trigger: 'blur' }
        ],
        deptType: [
          { required: true, message: '请选择机构类型', trigger: 'blur' }
        ],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        parentId: [
          { required: true, message: '请选择上级机构', trigger: 'blur' }
        ]
        // deptHeadsPhone:[
        //     { required: true, message: "请输入电话", trigger: "blur" },
        //     { max: 11, message: "最多输入 11 个字符", trigger: "blur" },
        // ],
        // deptHeads:[
        //     { required: true, message: "请输入负责人姓名", trigger: "blur" },
        //     { min: 3, message: "至少需要 3 个字符", trigger: "blur" },
        // ],
      }
    }
  },
  mounted() {},
  methods: {

    closeDialog() {
      this.$emit('closeDialog')
    },
    changeInsertFlag() {
      this.$emit('changeInsertFlag')
    },
    getTableData() {
      this.$emit('getTableData')
    },

    submit() {
      this.$refs.detailData.validate((valid) => {
        if (valid) {
          if (this.insertType) {
            let parm = {}
            if (typeof this.detailData.parentId === 'string') {
              parm = this.detailData
            } else {
              parm = this.detailData
              parm.parentId = parm.parentId[parm.parentId.length - 1]
            }
            orgInsert(parm).then((res) => {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              })
              this.changeInsertFlag()
              this.getTableData()
            })
          } else {
            let parm = {}
            if (typeof this.detailData.parentId === 'string') {
              parm = this.detailData
            } else {
              parm = this.detailData
              parm.parentId = parm.parentId[parm.parentId.length - 1]
            }
            orgUpdate(parm).then((res) => {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              })
              this.changeInsertFlag()
              this.getTableData()
            })
          }
        }
      })
    }
  }
}
</script>
