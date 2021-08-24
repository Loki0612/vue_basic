<!--
 * @LastEditors: yzw
 * @Author: Richardlv
-->

<template>
  <el-dialog
    width="60%"
    title="新增菜单"
    :visible.sync="detailFlag"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form
      ref="detailData"
      :model="detailData"
      label-position="right"
      class="formBox"
      label-width="120px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构名称" prop="name" class="formItem">
            <el-input v-model="detailData.name" :readonly="true" class="el_input_cust" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort" class="formItem">
            <el-input v-model="detailData.sort" :readonly="true" class="el_input_cust" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="类型" prop="deptType" class="formItem">
            <el-input v-model="changeDeptType[detailData.deptType]" :readonly="true" class="el_input_cust" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人" prop="deptHeads" class="formItem">
            <el-input v-model="detailData.deptHeads" :readonly="true" class="el_input_cust" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话" prop="deptHeadsPhone" class="formItem">
            <el-input v-model="detailData.deptHeadsPhone" :readonly="true" class="el_input_cust" type="tel" maxlength="11" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级机构" prop="parentId" class="formItem">
            <el-cascader
              v-model="detailData.parentId"
              class="el_input_cust"
              :options="tableData"
              :props="{
                checkStrictly: true,
                label: 'name',
                value: 'id',
              }"
              clearable
              filterable
            />
            <div class="coverBox" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark" class="formItem">
            <el-input v-model="detailData.remark" :readonly="true" class="el_input_cust" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeDetailFlag">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
    props: {
        tableData: Array,
        changeDeptType: Array,
        detailFlag: Boolean,
        detailData: Object
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        changeDetailFlag() {
            this.$emit('changeDetailFlag')
        }
    }
}
</script>
<style>
.coverBox{
    height: 100%;
    width: 100%;
    position: absolute;
    top:0;
    left: 0;
    z-index: 1000;
}
.el_input_cust input{
    border:none;
}
.el_input_cust textarea{
    border:none;
}
.el_input_cust .el-input__suffix{
    display: none;
}
</style>
