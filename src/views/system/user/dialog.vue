<!--
 * @Author: your name
 * @Date: 2021-03-18 14:32:46
 * @LastEditTime: 2021-03-23 14:50:37
 * @LastEditors: Please set LastEditors
 * @Description: 用户管理-对话框
 * @FilePath: \recovery_management\src\views\system\user\dialog.vue
-->

<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="IsShowPage"
        :close-on-click-modal="false"
        @closed="cancelSubmit()"
    >
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            class="formBox"
            :rules="rules"
        >
            <el-row>
                <!-- 姓名 trueName	姓名	string	 -->
                <el-col :span="12">
                    <el-form-item
                        label="用户姓名"
                        class="formItem"
                        prop="trueName"
                    >
                        <el-input v-model="form.trueName"></el-input>
                    </el-form-item>
                </el-col>
                <!-- 工号 workNumber	工号  -->
                <el-col :span="12">
                    <el-form-item
                        label="工号"
                        class="formItem"
                        prop="workNumber"
                    >
                        <el-input v-model="form.workNumber"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <!-- 账号 username	账号	string	 -->
                <el-col :span="12">
                    <el-form-item
                        label="登录账号"
                        class="formItem"
                        prop="username"
                    >
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                </el-col>
                <!-- 手机号 phone	手机号	string	 -->
                <el-col :span="12">
                    <el-form-item label="手机号" class="formItem" prop="phone">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <!-- 岗位 doctorPosition	岗位	string	 -->
                <el-col :span="12">
                    <el-form-item
                        label="岗位"
                        class="formItem"
                        prop="doctorPosition"
                    >
                        <el-select
                            v-model="form.doctorPosition"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in positionOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="所属机构"
                        class="formItem"
                        prop="deptIds"
                    >
                        <el-cascader
                            :options="editTreeData"
                            :props="{
                                checkStrictly: true,
                                label: 'label',
                                value: 'id',
                                multiple: true 
                            }"
                            v-model="form.deptIds"
                            filterable
                        >
                        </el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="角色" class="formItem" prop="roleIds">
                        <el-select
                            v-model="form.roleIds"
                            multiple
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- 是否登录 login	是否可以登陆 0:可以登陆,1:禁止登陆	string -->
                <el-col :span="12">
                    <el-form-item
                        label="是否登录"
                        class="formItem"
                        prop="login"
                    >
                        <el-select
                            v-model="form.login"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in loginOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <!-- 状态 status	禁用状态 0:正常,1:禁用	string -->
                <el-col :span="12">
                    <el-form-item label="状态" class="formItem" prop="status">
                        <el-select
                            v-model="form.status"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in statusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" class="formItem" prop="remark">
                        <el-input
                            type="textarea"
                            :rows="3"
                            v-model="form.remark"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelSubmit()">取 消</el-button>
            <el-button type="primary" @click="onSubmit()"
                >确 定</el-button
            >
        </span>
    </el-dialog>
</template>

<script>
import { getUserInfo } from "@/api/user";
import { getDict } from "@/api/common";
export default {
    data() {
        const validatePassword = (rule, value, callback) => {
            if (this.form.id) {
                if (value != this.form.password) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            } else {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.form.password) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            }
        };
        return {
            IsShowPage: this.dialogVisible,
            rules: {
                // username, trueName, phone, deptLabels, id, workNumber, status, doctorPosition, roleIds, remark, login
                trueName: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    { max: 10, message: "最多10个字符", trigger: "blur" },
                ],
                username: [
                    { required: true, message: "请输入账号", trigger: "blur" },
                    {
                        validator: function (rule, value, callback) {
                            if (
                                /^(?![A-Za-z]+$)(?![\W_]+$)\S{6,16}$/.test(
                                    value
                                ) == false
                            ) {
                                callback(
                                    new Error(
                                        "账号至少要包括大小写字母、数字的其中两项,长度为6-16位"
                                    )
                                );
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur",
                    },
                    {
                        validator: function (rule, value, callback) {
                            if (/^1[34578]\d{9}$/.test(value) == false) {
                                callback(new Error("手机号格式错误"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
                workNumber: [
                    { required: true, message: "请输入工号", trigger: "blur" },
                    { max: 20, message: "最多20个字符", trigger: "blur" },
                ],
                status: [
                    {
                        required: true,
                        message: "请选择状态",
                        trigger: "blur",
                    },
                ],
                doctorPosition: [
                    {
                        required: true,
                        message: "请选择岗位",
                        trigger: "blur",
                    },
                ],
                deptIds: [
                    {
                        required: true,
                        message: "请选择所属机构",
                        trigger: "blur",
                    },
                ],
                roleIds: [
                    {
                        required: true,
                        message: "请选择角色",
                        trigger: "blur",
                    },
                ],
                login: [
                    {
                        required: true,
                        message: "请选择登录状态",
                        trigger: "blur",
                    },
                ],
            },
            form: {
                username: "",
                trueName: "",
                phone: "",
                deptIds: [],
                deptLabels: [],
                id: "",
                workNumber: "",
                status: "",
                doctorPosition: [],
                roleIds: [],
                remark: "",
                login: "",
            },
            statusOptions: [
                //类型配置
                {
                    label: "启用",
                    value: "0",
                },
                {
                    label: "禁用",
                    value: "1",
                },
            ],
            loginOptions: [
                //类型配置
                {
                    label: "是",
                    value: "0",
                },
                {
                    label: "否",
                    value: "1",
                },
            ],
            editTreeData: [],
            roleList: [],
            positionOptions: [],
        };
    },
    created() {
    },
    mounted() {
        this.initUserInfo(this.row);
        this.getDoctorPosition();
    },
    props:{
        dialogTitle: String,
        dialogVisible: Boolean,
        row: Object,
    },
    methods: {
        initUserInfo(row) {
            let param = {};
            if (row.id) {
                param.id = row.id;
            }
            getUserInfo(param).then((res) => {
                this.editTreeData = res.deptLevelTreeList;
                this.roleList = res.roleResList;
                if (res.sysUserDetailsRes && res.sysUserDetailsRes.id) {
                    this.form.id = res.sysUserDetailsRes.id;
                    const {
                        username,
                        trueName,
                        password,
                        phone,
                        deptIds,
                        deptLabels,
                        id,
                        workNumber,
                        status,
                        doctorPosition,
                        roleIds,
                        remark,
                        login,
                    } = res.sysUserDetailsRes;
                    this.form = {
                        ...this.form,
                        username,
                        trueName,
                        phone,
                        deptLabels,
                        id,
                        workNumber,
                        status,
                        doctorPosition,
                        roleIds,
                        remark,
                        login,
                    };
                    this.getDepLables(deptIds,this.editTreeData)
                    this.form.deptIds = this.form.deptIds.map(item => item.split(","))
                }
            });
        },
        getDepLables(depIds, depTreeArray){
            depTreeArray.forEach(item => {
                if (depIds.includes(item.id)) {
                    this.form.deptIds.push(item.parentIds + item.id)
                }
                if (item.children) {
                    this.getDepLables(depIds, item.children)
                }
            })
        },
        getDoctorPosition() {
            getDict({ type: "doctor_position" }).then((res) => {
                this.positionOptions = res.doctor_position;
            });
        },
        cancelSubmit() {
            this.$emit("cancelSubmit");
        },
        onSubmit() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    const {
                        deptIds,
                        doctorPosition,
                        id,
                        login,
                        phone,
                        remark,
                        roleIds,
                        status,
                        trueName,
                        username,
                        workNumber,
                    } = this.form;
                    let selectSepIds = deptIds.map(item => item.reverse()[0])
                    let params = {
                        deptList: selectSepIds,
                        doctorPosition,
                        login,
                        phone,
                        remark,
                        roleList: roleIds,
                        status,
                        trueName,
                        username,
                        workNumber,
                    };
                    if (id) {
                        params.id = id;
                    }
                    this.$emit("onSubmit", params);
                } else {
                    return false;
                }
            });
        },
    },
};
</script>