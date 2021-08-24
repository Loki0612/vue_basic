<!--
 * @Author: your name
 * @Date: 2021-03-18 11:55:15
 * @LastEditTime: 2021-03-18 17:52:48
 * @LastEditors: Please set LastEditors
 * @Description: 医院管理-对话框
 * @FilePath: \recovery_management\src\views\system\hospital\dialog.vue
-->

<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        @closed="cancelSubmit('form')"
        width="60%"
    >
        <el-form
            ref="form"
            :model="form"
            label-width="120px"
            class="formBox"
            :rules="rules"
        >
            <el-row class="formRow">
                <el-col :span="12">
                    <el-form-item
                        label="医院："
                        class="formItem"
                        prop="hospitalName"
                    >
                        <el-input v-model="form.hospitalName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="系统名称："
                        class="formItem"
                        prop="systemName"
                    >
                        <el-input v-model="form.systemName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="formRow">
                <el-col :span="12">
                    <el-form-item
                        label="负责人："
                        class="formItem"
                        prop="hospitalPrincipal"
                    >
                        <el-input v-model="form.hospitalPrincipal"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="电话："
                        class="formItem"
                        prop="hospitalPhone"
                    >
                        <el-input v-model="form.hospitalPhone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="formRow">
                <el-col :span="12">
                    <el-form-item
                        label="传真："
                        class="formItem"
                        prop="hospitalFax"
                    >
                        <el-input v-model="form.hospitalFax"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="邮箱："
                        class="formItem"
                        prop="hospitalEmail"
                    >
                        <el-input v-model="form.hospitalEmail"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="formRow">
                <el-col :xl="7" :lg="12">
                    <el-form-item
                        label="设置初始密码："
                        class="formItem"
                        prop="changePwd"
                    >
                        <el-radio v-model="form.changePwd" label="0"
                            >否</el-radio
                        >
                        <el-radio v-model="form.changePwd" label="1"
                            >是</el-radio
                        >
                    </el-form-item>
                </el-col>
                <el-col :xl="17" :lg="12">
                    <el-form-item class="formItem" prop="defaultPassword">
                        <el-input
                            v-show="form.changePwd === '1'"
                            v-model="form.defaultPassword"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="formRow">
                <el-col :span="24">
                    <el-form-item
                        label="地址："
                        class="formItem"
                        prop="hospitalAddress"
                    >
                        <el-input
                            type="textarea"
                            :rows="2"
                            v-model="form.hospitalAddress"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="formRow">
                <el-col :span="24">
                    <el-form-item
                        label="备注"
                        class="formItem"
                        prop="hospitalRemark"
                    >
                        <el-input
                            type="textarea"
                            :rows="2"
                            v-model="form.hospitalRemark"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="formRow">
                <el-col :span="12">
                    <el-form-item
                        label="app下载地址："
                        class="formItem"
                        prop="avatar"
                    >
                        <div class="img">
                            <img
                                :src="form.avatar"
                                v-show="form.avatar"
                                @click="setAvatar"
                                class="imgBox"
                            />
                            <div
                                :src="form.avatar"
                                v-show="!form.avatar"
                                @click="setAvatar"
                                class="defalutImg"
                            >
                                <i class="el-icon-plus"></i>
                            </div>
                        </div>
                        <input
                            type="file"
                            name="form.avatar"
                            accept="image/gif,image/jpeg,image/jpg,image/png"
                            style="display: none"
                            @change="changeImage($event)"
                            ref="avatarInput"
                        />
                        <el-dialog :visible.sync="uploadVisible">
                            <img width="100%" :src="dialogImageUrl" alt="" />
                        </el-dialog>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="logo："
                        class="formItem"
                        prop="logoAvatar"
                    >
                        <div class="img">
                            <img
                                :src="form.logoAvatar"
                                v-show="form.logoAvatar"
                                @click="setLogoAvatar"
                                class="imgBox"
                            />
                            <div
                                :src="form.logoAvatar"
                                v-show="!form.logoAvatar"
                                @click="setLogoAvatar"
                                class="defalutImg"
                            >
                                <i class="el-icon-plus"></i>
                            </div>
                        </div>
                        <input
                            type="file"
                            name="form.avatar"
                            accept="image/gif,image/jpeg,image/jpg,image/png"
                            style="display: none"
                            @change="changeLogoImage($event)"
                            ref="avatarLogoInput"
                        />
                        <el-dialog :visible.sync="uploadVisible">
                            <img
                                width="100%"
                                :src="dialogLogoImageUrl"
                                alt=""
                            />
                        </el-dialog>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelSubmit('form')">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')"
                >确 定</el-button
            >
        </span>
    </el-dialog>
</template>

<script>
import { getHospitalInfo } from "@/api/hospital";
import common from "@/config/common";
export default {
    data() {
        return {
            rules: {
                hospitalName: [
                    {
                        required: true,
                        message: "请输入医院名称",
                        trigger: "blur",
                    },
                    { max: 20, message: "不能超过20个字符", trigger: "blur" },
                ],
                systemName: [
                    {
                        required: true,
                        message: "请输入系统名",
                        trigger: "blur",
                    },
                    { max: 20, message: "不能超过20个字符", trigger: "blur" },
                ],
                hospitalPrincipal: [
                    { max: 10, message: "不能超过10个字符", trigger: "blur" },
                ],
            },
            baseUrl: common.fileUrl,
            form: {
                hospitalName: "",
                systemName: "",
                hospitalPrincipal: "", //负责人
                hospitalPhone: "",
                hospitalFax: "",
                hospitalEmail: "",
                changePwd: "0",
                hospitalAddress: "",
                hospitalRemark: "",
                imageUrl: "",
                headPortrait: "",
                avatar: "",
                logoAvatar: "",
                id: "",
                file: "",
                logoFile: "",
                defaultPassword: "",
            },
            dialogImageUrl: "",
            dialogLogoImageUrl: "",
            uploadVisible: false,
        };
    },
    mounted() {
        this.getHospitalData();
    },
    props: {
        dialogTitle: String,
        dialogVisible: Boolean,
    },
    methods: {
        getHospitalData() {
            this.$store.dispatch("getHosInfo").then((res) => {
                const {
                    appDownloadAddress,
                    hospitalAddress,
                    hospitalEmail,
                    hospitalFax,
                    hospitalName,
                    hospitalPhone,
                    hospitalPrincipal,
                    hospitalRemark,
                    systemName,
                    id,
                    logo,
                } = res;
                this.form = {
                    ...this.form,
                    hospitalAddress,
                    hospitalEmail,
                    hospitalFax,
                    hospitalName,
                    hospitalPhone,
                    hospitalPrincipal,
                    hospitalRemark,
                    systemName,
                    appDownloadAddress,
                    logo,
                };
                if (appDownloadAddress) {
                    this.form.avatar = this.baseUrl + appDownloadAddress;
                }
                if (logo) {
                    this.form.logoAvatar = this.baseUrl + logo;
                }
            });
        },
        setAvatar() {
            this.$refs.avatarInput.click();
        },
        setLogoAvatar() {
            this.$refs.avatarLogoInput.click();
        },
        cancelSubmit(formName) {
            this.$emit("cancelSubmit", formName);
        },
        onSubmit() {
            this.$emit("onSubmit", this.form);
        },
        changeImage(event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            // let that = this
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.form.avatar = e.currentTarget.result;
                this.form.file = file;
            };
        },
        changeLogoImage(event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.form.logoAvatar = e.currentTarget.result;
                this.form.logoFile = file;
            };
        },
    },
};
</script>

<style lang='scss' scoped>
@import "~@/styles/variables.scss";

.imgBox {
    width: 150px;
    height: 150px;
    object-fit: contain;
    border: 1px solid $themeGray;
}
.defalutImg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border: 1px solid $themeGray;
    border-radius: 4px;
    cursor: pointer;
}
.disabled .el-upload--picture-card {
    display: none;
}
</style>