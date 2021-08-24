/*
 * @LastEditors: yzw
 * @Author: Richardlv
 */
import request from '@/utils/request'

/**
 * @description: 组织机构
 */
export function orgList(data) {
    return request({
        url: '/admin/dept/allList',
        method: 'GET',
        params: data,
        showLoading: true
    })
}

/**
 * @description: 删除机构
 */
 export function orgDel(data) {
    return request({
        url: '/admin/dept/delete',
        method: 'POST',
        data,
        showLoading: true
    })
}

/**
 * @description: 禁用机构
 */
 export function orgDisable(data) {
    return request({
        url: '/admin/dept/disableDept',
        method: 'POST',
        data,
        showLoading: true
    })
}

/**
 * @description: 修改机构
 */
 export function orgUpdate(data) {
    return request({
        url: '/admin/dept/update',
        method: 'POST',
        data,
        showLoading: true
    })
}

/**
 * @description: 新增机构
 */
 export function orgInsert(data) {
    return request({
        url: '/admin/dept/add',
        method: 'POST',
        data,
        showLoading: true
    })
}

/**
 * @description: 部门展示树
 */
 export function getDeptTree(data) {
    return request({
        url: '/admin/dept/getDeptTree',
        method: 'POST',
        data,
        showLoading: true
    })
}

/**
 * @description: 为机构分配用户
 */
 export function addUserToDept(data) {
    return request({
        url: '/admin/userDept/addUserToDept',
        method: 'POST',
        data,
        showLoading: true
    })
}

/**
 * @description: 解除部门与用户关系
 */
 export function disassociate(data) {
    return request({
        url: '/admin/userDept/disassociate',
        method: 'POST',
        data,
        showLoading: true
    })
}
