<!--
 * @LastEditors: Richardlv
 * @Author: Richardlv
-->

<template>
    <el-dialog
        width="60%"
        title="角色详情"
        :visible.sync="detailFlag"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
		@closed="clearTree"
    >
        <el-form
            ref="detailData"
            :model="detailData"
            label-position="right"
            label-width="120px"
            class="formBox"
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item label="角色名称" class="formItem" prop="name">
                        <el-input
                            :readonly="true"
                            class="el_input_cust"
                            v-model="detailData.name"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="角色编码"
                        class="formItem"
                        prop="roleEncoding"
                    >
                        <el-input
                            :readonly="true"
                            class="el_input_cust"
                            v-model="detailData.roleEncoding"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item
                        label="角色类型"
                        class="formItem"
                        prop="permissionType"
                    >
                        <el-input
                            :readonly="true"
                            class="el_input_cust"
                            v-model="
                                permissionTypeList[detailData.permissionType]
                            "
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item
                        label="角色描述"
                        class="formItem"
                        prop="remark"
                    >
                        <el-input
                            :readonly="true"
                            class="el_input_cust"
                            v-model="detailData.remark"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="功能权限" class="formItem">
                        <el-tree
                            :data="menuData"
                            :props="{
                                children: 'children',
                                hasChildren: 'hasChildren',
                                label: 'name',
                            }"
                            show-checkbox
                            default-expand-all
                            :check-on-click-node="false"
                            :expand-on-click-node="false"
                            node-key="id"
                            :default-checked-keys="oldCheckedMenu"
							ref="tree"
                        >
                        </el-tree>
                    </el-form-item>
                </el-col>
                <div class="coverBox"></div>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changedetailFlag">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { menuList } from "@/api/menu";
export default {
    data() {
        return {
            typeOptions: [
                {
                    value: "1",
                    label: "功能权限",
                },
                {
                    value: "2",
                    label: "数据权限",
                },
            ],
            menuData: [],
            checkedMenu: [],
            permissionTypeList: ["", "功能权限", "数据权限"],
        };
    },
    created() {
        this.getMenuData();
    },
    mounted() {},
    props: {
        detailData: Object,
        detailFlag: Boolean,
        oldCheckedMenu: Array,
    },
    methods: {
		clearTree(){
			this.$refs.tree.setCheckedKeys([]);
		},
        changedetailFlag() {
            this.$emit("changedetailFlag");
        },
        selectMenu(data, checkedData) {
            this.checkedMenu = checkedData.checkedKeys;
        },
        getMenuData() {
            menuList().then((res) => {
                this.menuData = res;
            });
        },
    },
};
</script>
<style scope>
.coverBox {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
}
.el_input_cust > input {
    border: none;
}
.el_input_cust > textarea {
    border: none;
}
.el-tree {
    margin-top: 8px;
}
</style>