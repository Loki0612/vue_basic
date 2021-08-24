/*
 * @LastEditors: yzw
 * @Author: Richardlv
 */
import request from '@/utils/request'

/**
 * @description: 获取字典项
 */
 export function getDict(data) {
    return request({
        url: '/dict/list',
        method: 'GET',
        params: data
    })
}

/**
 * @description: 上传单个文件
 * @param {Object} data
 */
export function uploadFile(data) {
  return request({
    url: '/file/uploadFile',
    method: 'POST',
    data
  })
}

/**
 * @description: 上传多个文件
 * @param {Object} data
 */
export function uploadFiles(data) {
  return request({
    url: '/file/uploadFiles',
    method: 'POST',
    upload: true,
    data
  })
}

/**
 * @description: 下载文件
 * @param {Object} data: data中必须有id字段
 */
export function downloadFile(data) {
  return request({
    url: '/file/download/' + data.id,
    method: 'GET',
    params: data
  })
}
