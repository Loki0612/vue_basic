<!--
 * @Author: your name
 * @Date: 2021-03-18 11:04:56
 * @LastEditTime: 2021-03-19 11:42:11
 * @LastEditors: Please set LastEditors
 * @Description: 日志-对话框
 * @FilePath: \recovery_management\src\views\system\record\dialog.vue
-->
<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        @closed="resetForm"
        width="60%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        class="formBox"
      >
          <!-- 
          executorDevice	执行设备	string	
          executorTime	执行时间	string(date-time)	
          executorUser	执行人	string	
          methodName	执行请求的方法	string	
          paramJson	参数	string	
          sqlInfo	sql信息	string	
        
        -->
        <el-row class="formRow">
          <!-- 执行设备 executorDevice	执行设备	string	 -->
          <el-col :span="12">
            <el-form-item label="执行设备:" class="formItem" prop="executorDevice">
              <el-input
                v-model="form.executorDevice"
                placeholder="执行设备"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- executorTime	执行时间	string(date-time)		 -->
          <el-col :span="12">
            <el-form-item label="执行时间:" class="formItem" prop="executorTime">
              <el-input
                v-model="form.executorTime"
                placeholder="执行时间"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="formRow">
          <!-- executorUser	执行人	string	 -->
          <el-col :span="12">
            <el-form-item label="执行人:" class="formItem" prop="executorUser">
              <el-input
                v-model="form.executorUser"
                placeholder="执行人"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- methodName	执行请求的方法	string	 -->
          <el-col :span="12">
            <el-form-item label="执行请求的方法:" class="formItem" prop="methodName">
              <el-input
                v-model="form.methodName"
                placeholder="执行请求的方法"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="formRow">
          <!-- paramJson	参数	string		 -->
          <el-col :span="24">
            <el-form-item label="参数:" class="formItem" prop="paramJson">
              <el-input
                v-model="form.paramJson"
                placeholder="参数"
                readonly
                type="textarea"
                :rows="4"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="formRow">
          <!-- sqlInfo	sql信息	string -->
          <el-col :span="24">
            <el-form-item label="sql信息:" class="formItem" prop="sqlInfo">
              <el-input
                v-model="form.sqlInfo"
                placeholder="sql信息"
                readonly
                type="textarea"
                :rows="4"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submit()">取 消</el-button>
      </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
    },
    props: {
        dialogTitle: String,
        dialogVisible: Boolean,
        form: Object
    },
    methods: {
        resetForm() {
            this.$emit('show', false)
        },
        submit() {
            this.$emit('show', false)
        }
    }
}
</script>