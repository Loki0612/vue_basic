/*
 * @Description: Api
 * @Author: yzw
 * @Date: 2020-06-23 06:15:04
 * @LastEditTime: 2021-08-19 14:17:54
 * @LastEditors: yzw
 * @Reference:
 */
import request from '@/utils/request'

/**
 * @description: 获取用户列表
 * @param {Object} data
 */
export function getUserList(data) {
  return request({
    url: '/admin/user/list',
    method: 'GET',
    params: data,
    showLoading: true
  })
}

/**
 * @description: 获取用户详细信息
 * @param {Object} data
 */
export function getUserInfo(data) {
  return request({
    url: '/admin/user/info',
    method: 'GET',
    params: data,
    showLoading: true
  })
}

/**
 * @description: 创建用户
 * @param {Object} data
 */
export function createUser(data) {
  return request({
    url: '/admin/user/add',
    method: 'POST',
    data
  })
}

/**
 * @description: 更新用户信息
 * @param {Object} data
 */
export function updateUserInfo(data) {
  return request({
    url: '/admin/user/update',
    method: 'POST',
    data,
    showLoading: true
  })
}

/**
 * @description: 删除用户
 * @param {Object} data
 */
export function delUser(data) {
  return request({
    url: '/admin/user/delete',
    method: 'POST',
    data,
    showLoading: true
  })
}

/**
 * @description: 修改当前登录用户密码
 * @param {Object} data
 */
 export function updatePassword(data) {
  return request({
    url: '/center/updatePassword',
    method: 'POST',
    data,
    showLoading: true
  })
}

/**
 * @description: 重置密码
 * @param {Object} data
 * @return {*}
 */
export function resetUserPwd(data) {
  return request({
    url: '/admin/user/resetPassword',
    method: 'POST',
    data,
    showLoading: true
  })
}

/**
 * @description: 禁用/启用用户
 * @param {Object} data
 * @return {*}
 */
export function disableUser(data) {
  return request({
    url: '/admin/user/disableUser',
    method: 'POST',
    data,
    showLoading: true
  })
}

/**
 * @description: 根据角色获取用户
 * @param {Object} data
 * @return {*}
 */
export function getUserByRole(data) {
  return request({
    url: '/admin/user/getUserByRole',
    method: 'GET',
    params: data
  })
}
