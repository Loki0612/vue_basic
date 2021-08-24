/*
 * @LastEditors: Please set LastEditors
 * @Author: Richardlv
 */
import request from '@/utils/request'

/**
 * @description: 权限列表
 */
export function menuList() {
    return request({
        url: '/admin/acl/tree',
        method: 'GET',
    })
}

/**
 * @description: 禁用启用权限
 * @param {Object} data
 */
 export function menuDisable(data) {
    return request({
        url: '/admin/acl/disable',
        method: 'POST',
        data
    })
}

/**
 * @description: 新增权限
 * @param {Object} data
 */
 export function menuInsert(data) {
    return request({
        url: '/admin/acl/insert',
        method: 'POST',
        data
    })
}

/**
 * @description: 删除权限
 * @param {Object} data
 */
 export function menuDel(data) {
    return request({
        url: '/admin/acl/del',
        method: 'POST',
        data
    })
}

/**
 * @description: 获取权限信息
 * @param {Object} data
 */
 export function menuInfo(data) {
    return request({
        url: '/admin/acl/info',
        method: 'GET',
        params:data
    })
}

/**
 * @description: 修改权限
 * @param {Object} data
 */
 export function menuEdit(data) {
    return request({
        url: '/admin/acl/update',
        method: 'POST',
        data,
        showLoading:true
    })
}