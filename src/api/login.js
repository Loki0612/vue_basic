/*
 * @Author: your name
 * @Date: 2021-03-18 10:42:35
 * @LastEditTime: 2021-03-18 10:51:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \recovery_management\src\api\login.js
 */
import request from '@/utils/request'

/**
 * @description: 登录
 * @param {Object} data
 */
export function login(data) {
  return request({
    url: '/login/pwLogin',
    method: 'POST',
    data
  })
}
