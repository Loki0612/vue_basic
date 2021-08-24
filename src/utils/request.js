/*
 * @Description:
 * @Author: yzw
 * @Date: 2020-06-23 06:15:04
 * @LastEditTime: 2021-08-12 16:56:22
 * @LastEditors: yzw
 * @Reference:
 */
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { showScreenLoading, hideScreenLoading } from './loading'
import { addPending } from '@/utils/pending'
import router from '@/router'

/**
 * 创建请求实例
 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10 * 1000
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  config => {
    // removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    if (store.getters.token) {
      config.headers = getToken()
    }
    if (config.method === 'get') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    if (config.upload === true) {
      config.headers['Content-Type'] = 'multipart/form-data;boundary = ' + new Date().getTime()
    }
    if (config.showLoading === true) {
      showScreenLoading()
    }
    return config
  },
  error => {
    console.error(error)
    hideScreenLoading()
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  response => {
    console.log('response:', response.config.url, response)
    // 关闭loading
    if (response.config.showLoading === true) {
      hideScreenLoading()
    }
    const { state, msg, data } = response.data
    if (state < 300) {
      console.log('HTTP------', data)
      return data
    } else if (state >= 610 && state <= 614) {
      store.dispatch('logout').then(() => {
        Message.error('验证失败,请重新登录', msg)
        router.push(`/login?redirect=${router.fullPath}`)
      })
      return false
    } else {
      console.log('STATE_ERROR------', response.data)
      Message({
        message: msg || '请求异常',
        type: 'error',
        duration: 5 * 1000
      })
      // removePending(response.config) // 在请求结束后，移除本次请求
      return Promise.reject(response.data)
    }
  },
  error => {
    // 关闭loading
    // if (response.config.showLoading !== false) {
      hideScreenLoading()
    // }
    if (axios.isCancel(error)) {
      console.log('取消重复的请求: ', error)
    } else {
      console.log('RESPONSE_ERROR------', error)
      Message({
        message: error.msg || '请求异常',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
