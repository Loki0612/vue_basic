/*
 * @LastEditors: yzw
 * @Author: Richardlv
 */
import request from '@/utils/request'

/**
 * @description: 角色列表
 * @param {Object} data
 */
export function roleList(data) {
    return request({
        url: '/admin/role/list',
        method: 'GET',
        params: data
    })
}

/**
 * @description: 禁用启用角色
 * @param {Object} data
 */
export function roleDisable(data) {
    return request({
        url: '/admin/role/disableRole',
        method: 'POST',
        data
    })
}

/**
 * @description: 新增角色
 * @param {Object} data
 */
export function roleInsert(data) {
    return request({
        url: '/admin/role/insert',
        method: 'POST',
        data
    })
}

/**
 * @description: 删除角色
 * @param {Object} data
 */
 export function roleDel(data) {
    return request({
        url: '/admin/role/delete',
        method: 'POST',
        data
    })
}

/**
 * @description: 修改角色
 * @param {Object} data
 */
 export function roleEdit(data) {
    return request({
        url: '/admin/role/update',
        method: 'POST',
        data
    })
}

/**
 * @description: 角色菜单修改
 * @param {Object} data
 */
 export function roleMenu(data) {
    return request({
        url: '/admin/roleAcl/saveRoleAcl',
        method: 'POST',
        data
    })
}

/**
 * @description: 根据角色获取角色的权限
 * @param {Object} data
 */
 export function getAclList(data) {
    return request({
        url: '/admin/roleAcl/getAclListByRole',
        method: 'GET',
        params: data
    })
}

/**
 * @description: 为角色分配用户
 * @param {Object} data
 */
 export function addUserToRole(data) {
    return request({
        url: '/admin/userRole/addUserToRole',
        method: 'POST',
        data
    })
}

/**
 * @description: 解除角色与用户关系
 * @param {Object} data
 */
 export function disassociate(data) {
    return request({
        url: '/admin/userRole/disassociate',
        method: 'POST',
        data
    })
}
