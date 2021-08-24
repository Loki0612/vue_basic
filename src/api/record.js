/*
 * @Author: your name
 * @Date: 2021-03-11 13:32:19
 * @LastEditTime: 2021-08-19 14:17:59
 * @LastEditors: yzw
 * @Description: In User Settings Edit
 * @FilePath: \recovery_management\src\api\record.js
 */
// admin/log/list
import request from '@/utils/request'

/**
 * @description: 获取日志列表
 * @param {Object} data
 */
export function getRecordList(data) {
  return request({
    url: '/admin/log/list',
    method: 'GET',
    params: data,
    showLoading: true
  })
}
