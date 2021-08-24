<!--
 * @Author: your name
 * @Date: 2021-03-19 09:03:22
 * @LastEditTime: 2021-03-24 11:23:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \recovery_management\src\views\system\user\noBorderDialog.vue
-->

<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        @closed="cancelSubmit()"
    >
        <el-form
            ref="form"
            :model="form"
            label-width="120px"
            class="formBox"
        >
            <el-row>
                <!-- 姓名 trueName	姓名	string	 -->
                <el-col :span="12">
                    <el-form-item
                        label="用户姓名："
                        class="formItem"
                        prop="trueName"
                    >
                        <span>{{this.form.trueName}}</span>
                    </el-form-item>
                </el-col>
                <!-- 工号 workNumber	工号  -->
                <el-col :span="12">
                    <el-form-item
                        label="工号："
                        class="formItem"
                        prop="workNumber"
                    >
                        <span>{{this.form.workNumber}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <!-- 账号 username	账号	string	 -->
                <el-col :span="12">
                    <el-form-item
                        label="登录账号："
                        class="formItem"
                        prop="username"
                    >
                        <span>{{this.form.username}}</span>
                    </el-form-item>
                </el-col>
                <!-- 手机号 phone	手机号	string	 -->
                <el-col :span="12">
                    <el-form-item 
                        label="手机号：" 
                        class="formItem" 
                        prop="phone"
                    >
                        <span>{{this.form.phone}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <!-- 岗位 doctorPosition	岗位	string	 -->
                <el-col :span="12">
                    <el-form-item
                        label="岗位："
                        class="formItem"
                        prop="positionLabels"
                    >
                        <span>{{this.form.positionLabels.join("，") || "无"}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="所属机构："
                        class="formItem"
                        prop="deptLabels"
                    >
                        <span>{{this.form.deptLabels.join("，") || "无"}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item 
                        label="角色：" 
                        class="formItem" 
                        prop="roleLables"
                    >
                        <span>{{this.form.roleLables.join("，") || "无"}}</span>
                    </el-form-item>
                </el-col>
                <!-- 是否登录 login	是否可以登陆 0:可以登陆,1:禁止登陆	string -->
                <el-col :span="12">
                    <el-form-item
                        label="是否登录："
                        class="formItem"
                        prop="login"
                    >
                        <span>{{this.loginOptions[this.form.login]}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <!-- 状态 status	禁用状态 0:正常,1:禁用	string -->
                <el-col :span="12">
                    <el-form-item label="状态：" class="formItem" prop="status">
                        <span>{{this.statusOptions[this.form.status]}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注：" class="formItem" prop="remark">
                        <span>{{this.form.remark}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelSubmit()">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { getUserInfo } from "@/api/user";
import { getDict } from "@/api/common";
export default {
    props: {
        dialogTitle: String,
        dialogVisible: Boolean,
        row: Object,
    },
    data() {
        return {
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
                positionLabels: [],
                roleIds: [],
                roleLables: [],
                remark: "",
                login: "",
            },
            loginOptions: ["是", "否"],
            statusOptions: ["启用", "禁用"]
        }
    },
    mounted() {
        this.initUserInfo(this.row)
    },
    methods: {
        initUserInfo(row) {
            let param = {
                id: row.id
            };
            getUserInfo(param).then((res) => {
                this.editTreeData = res.deptLevelTreeList;
                this.roleList = res.roleResList;
                if (res.sysUserDetailsRes.id) {
                    this.form.id = res.sysUserDetailsRes.id;
                    const {
                        username,
                        trueName,
                        password,
                        phone,
                        deptIds,
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
                        deptIds,
                        id,
                        workNumber,
                        status,
                        doctorPosition,
                        roleIds,
                        remark,
                        login,
                    };
                    
                    this.getDepLables(this.form.deptIds, res.deptLevelTreeList)
                    this.form.roleLables = this.getRoleLables(this.form.roleIds, res.roleResList)
                    getDict({ type: "doctor_position" }).then((docRes) => {
                        this.form.positionLabels = this.getDocLabels(this.form.doctorPosition, docRes.doctor_position)
                    });
                }
            });
        },
        getRoleLables(roleIds, roleResList){
            let roleLables = [];
            for (let i of roleResList) {
                if (roleIds.includes(i.id)) {
                    roleLables.push(i.name)
                }
            }
            return roleLables
        },
        getDepLables(depIds, depTreeArray){
            depTreeArray.forEach(item => {
                if (depIds.includes(item.id)) {
                    this.form.deptLabels.push(item.name)
                }
                if (item.children) {
                    this.getDepLables(depIds, item.children)
                }
            })
        },
        getDocLabels(doctorPosition, doctorArray) {
            let positionLabels = []
            for (let item of doctorArray) {
                if (doctorPosition.includes(item.value)) {
                    positionLabels.push(item.label)
                    break;
                }
            }
            return positionLabels
        },
        cancelSubmit() {
            this.$emit("cancelSubmit");
        },
    }
}
</script>