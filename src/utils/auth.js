/*
 * @Description: token设置
 * @Author: yzw
 * @Date: 2020-06-23 06:15:04
 * @LastEditTime: 2021-08-12 16:56:32
 * @LastEditors: yzw
 * @Reference:
 */

import Cookies from 'js-cookie'
import moment from 'moment'
import Jsencrypt from 'jsencrypt'
import qs from 'qs'
const TokenKey = 'user_token'

export function getToken() {
  let token = Cookies.get(TokenKey)
  if (token) {
    token = qs.parse(token)
    const encrypt = new Jsencrypt()
    encrypt.setPublicKey(token.publicKey)
    const key = encrypt.encrypt(moment().valueOf() + '')
    return {
      authentication: key,
      unique: token.unique
    }
  } else {
    return null
  }
}

export function hasToken() {
  const token = Cookies.get(TokenKey)
  if (token === null || token === undefined || token === '') {
    return false
  } else {
    return true
  }
}

export function setToken(token) {
  token = qs.stringify(token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

