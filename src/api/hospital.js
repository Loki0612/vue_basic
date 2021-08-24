/*
 * @Description: 关于医院相关信息Api
 * @Author: yzw
 * @Date: 2021-03-09 13:36:31
 * @LastEditTime: 2021-08-19 14:18:13
 * @LastEditors: yzw
 * @Reference:
 */
import request from '@/utils/request'

/**
 * @description: 获取当前医院信息
 */
 export function getHospitalInfo() {
    return request({
      url: '/admin/system/info',
      method: 'GET',
      showLoading: true
    })
}

/**
 * @description: 更新医院信息
 * @param {Object} data
 */
export function updateHospitalInfo(data) {
  return request({
    url: '/admin/system/update',
    method: 'POST',
    data,
    showLoading: true
  })
}
