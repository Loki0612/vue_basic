/*
 * @Description: 预防重复请求
 * @Author: yzw
 * @Date: 2021-03-17 14:25:02
 * @LastEditTime: 2021-08-12 16:56:24
 * @LastEditors: yzw
 * @Reference:
 */
import axios from 'axios'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()

/**
 * 添加请求
 * @param {Object} config
 */
export const addPending = (config) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data)
  ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })
  // console.log('添加后:',pending)
}

/**
 * 移除请求
 * @param {Object} config
 */
export const removePending = (config) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data)
  ].join('&')
  if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
  // console.log('移除后:',pending)
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}
