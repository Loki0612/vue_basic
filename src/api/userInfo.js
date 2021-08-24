/*
 * @Author: your name
 * @Date: 2021-03-18 10:40:03
 * @LastEditTime: 2021-08-19 14:17:49
 * @LastEditors: yzw
 * @Description: In User Settings Edit
 * @FilePath: \recovery_management\src\api\userInfo.js
 */
import request from '@/utils/request'

/**
 * @description: 修改当前登录用户密码
 * @param {Object} data
 */
 export function updatePassword(data) {
    return request({
      url: '/center/updatePassword',
      method: 'POST',
      data
    })
  }

/**
 * @description: 获取医生用户信息
 */
export function getInfo() {
return request({
    url: '/center/userIndex',
    method: 'GET'
})
}
