<!--
 * @Description: 医院管理
 * @Author: yzw
 * @Date: 2021-02-03 10:49:05
 * @LastEditTime: 2021-03-24 16:29:20
 * @LastEditors: Richardlv
 * @Reference: 
-->

<template>
  <el-scrollbar style="height:100%;width:100%">
      <el-container>
        <el-header>
          <el-row class="table-btn-group" style="margin-top: 10px;width: 100%;">
            <el-col :span="24">
              <div class="right-menu">
                <el-button type="primary" @click="edit()">编辑</el-button>
                <el-button @click="back()">返回</el-button>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="basic-main">
          <el-row>
            <el-col :lg="12" :xl="9">
              <div class="title">
                {{this.show.hospitalName || "--"}}
              </div>
            </el-col>
            <el-col :lg="12" :xl="9">
              <div class="title">
                {{this.show.systemName || "--"}}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :xl="9">
              <div class="content">
                <span class="content-label">负责人：</span>
                <span class="content-content">{{this.show.hospitalPrincipal || "--"}}</span>
              </div>
            </el-col>
            <el-col :lg="12" :xl="9">
              <div class="content">
                <span class="content-label">电话：</span>
                <span class="content-content">{{this.show.hospitalPhone || "--"}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :xl="9">
              <div class="content">
                <span class="content-label">传真：</span>
                <span class="content-content">{{this.show.hospitalFax || "--"}}</span>
              </div>
            </el-col>
            <el-col :lg="12" :xl="9">
              <div class="content">
                <span class="content-label">邮箱：</span>
                <span class="content-content">{{this.show.hospitalEmail || "--"}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :xl="9">
              <div class="content">
                <span class="content-label">地址：</span>
                <span class="content-content">{{this.show.hospitalAddress || "--"}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :xl="9">
              <div class="content">
                <span class="content-label">备注：</span>
                <span class="content-content">{{this.show.hospitalRemark || "--"}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :xl="9">
              <div class="content">
                <span class="content-label">APP下载地址：</span>
                <div class="content-image">
                  <el-image v-show="show.appDownloadAddress"
                    class="menu-item-img"
                    :src="show.avatar"
                    fit="contain"
                  ></el-image>
                </div>
              </div>
            </el-col>
            <el-col :lg="12" :xl="9">
              <div class="content">
                <span class="content-label">logo：</span>
                <div class="content-image">
                  <el-image v-show="show.logo"
                    class="menu-item-img"
                    :src="show.logoAvatar"
                    fit="contain"
                  ></el-image>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
        <myDialog 
          v-if="this.dialogVisible"
          :dialogTitle="this.dialogTitle" 
          :dialogVisible="this.dialogVisible" 
          @onSubmit="onSubmit" 
          @cancelSubmit="cancelSubmit" 
        />
      </el-container>
  </el-scrollbar>
</template>

<script>
import {getHospitalInfo, updateHospitalInfo} from '@/api/hospital'
import {uploadFile, getFile, uploadFiles} from '@/api/common'
import common from "@/config/common"
import myDialog from '@/views/system/hospital/dialog'
import axios from 'axios'
export default {
  components: {
    myDialog
  },
  data() {
      return{
        baseUrl: common.fileUrl,
        show : {
          hospitalName: "",
          systemName: "",
          hospitalPrincipal: "", //负责人
          hospitalPhone: "",
          hospitalFax: "",
          hospitalEmail: "",
          hospitalAddress: "",
          hospitalRemark: "", 
          imageUrl: "",
          headPortrait: "",
          avatar: "",
          logoAvatar: "",
          id: "",
        },
        changePwdOption: [
          {
            value: "0",
            label: "否"
          },
          {
            value: "0",
            label: "否"
          }
        ],
        dialogTitle: "医院详情",
        dialogVisible: false,
        hideUpload: false,
        imagelist: [],
        limitCount: 1,
      }
  },
  created() {},
  mounted() {
    this.getHospitalData();
  },
  methods: {
    getHospitalData() {
      this.$store.dispatch("getHosInfo").then((res) => {
        const {appDownloadAddress, hospitalAddress, hospitalEmail, hospitalFax, hospitalName, hospitalPhone, hospitalPrincipal, hospitalRemark, systemName, id, logo} = res
          this.show = {
            ...this.show,
            hospitalAddress,
            hospitalEmail,
            hospitalFax,
            hospitalName,
            hospitalPhone,
            hospitalPrincipal,
            hospitalRemark,
            systemName,
            appDownloadAddress,
            logo
          }
          if (appDownloadAddress) {
            this.show.avatar = this.baseUrl + appDownloadAddress
          }
          if (logo) {
            this.show.logoAvatar = this.baseUrl + logo
          }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancelSubmit(formName) {
      this.dialogVisible = false
      // this.resetForm(formName)
    },
    onSubmit(form) {
      this.dialogVisible = false
        let formData = new FormData();
        let formArray = []; // 放置文件数组
        let resArray = []; // 放置文件索引
        if (form.file) { // 如果app下载图片进行了上传
        // 传入app图片的文件 获取的index为0
          formArray.push(form.file) 
          resArray.push(0)
        }
        if (form.logoFile) { // 如果logo图片进行了上传
        // 传入logo图片的文件 获取的index为1
          formArray.push(form.logoFile)
          resArray.push(1)
        }
        // 遍历formArray，将文件插入到formData中
        for (let i of formArray ) {
          formData.append('files', i, i.name)
        }
        const {appDownloadAddress, hospitalAddress, hospitalEmail, hospitalFax, hospitalName, hospitalPhone, hospitalPrincipal, hospitalRemark, systemName, defaultPassword} = form
        
      let params = {
        appDownloadAddress, 
        hospitalAddress, 
        hospitalEmail, 
        hospitalFax, 
        hospitalName, 
        hospitalPhone, 
        hospitalPrincipal, 
        hospitalRemark, 
        systemName}
      if (form.changePwd === "1") {
         params.defaultPassword = defaultPassword
      }
      if (formArray.length) { // 有文件上传时，先走文件上传接口，再走医院信息更新接口
        uploadFiles(formData).then(res => {
          if(resArray.includes(0)) { // 如果resArray中包含0，则app图片id从res[0]中取出来
            params.appDownloadAddress = res[0]
            if (resArray.includes(1)) {// 如果resArray中包含0且包含1，则logo图片id从res[1]中取出来
              params.logo = res[1]
            }
          } else { // 如果resArray中不包含0，则logo图片id从res[0]中取出来
            params.logo = res[0]
          }
          // 根据上传图片的返回值确定参数，更新医院信息
          this.$store.dispatch("saveHosInfo", params).then((res) => {
            this.getHospitalData()
          })
        })
      } else { // 没有文件上传时，直接走医院信息更新接口
          // 根据上传图片的返回值确定参数，更新医院信息
          this.$store.dispatch("saveHosInfo", params).then((res) => {
            this.getHospitalData()
          })
      }
    },
    edit() {
      this.dialogVisible = true
    },
    back() {
      this.$router.push({ path: "/system" });
      // if (window.history.length <= 1) {
      //   this.$router.push({ path: "/system" });
      //   return false;
      // } else {
      //   this.$router.push({ path: "/system" });
      // }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~@/styles/variables.scss";

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .el-main{
    padding-left: 4vw;
  }
  .title {
    font-weight: bold;
    color: $black;
  }
  .content {
    margin-top: 2vw;
    color: $black;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    &-label {
      color: $darkGray;
      // width: 200px;
    }
    &-content {
      color: $black;
    }
    &-image {
      width: 13vw;
      height: 13vw;
      background-color: #f8f8f8;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px;
      margin-left: 3vw;
    }
  }
</style>
