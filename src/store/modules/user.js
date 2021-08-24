
import _ from 'lodash'
import router from '@/router'
import {login} from '@/api/login'
import {getInfo} from '@/api/userInfo'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {constantRoutes,notFoundRouter,resetRouter} from '@/router';

const getDefaultState = () => {
  return {
    token: getToken(),
    userName: '',
    trueName: '',
    roles: constantRoutes || []
  }
}

//将后台返回的json权限数据格式化（递归遍历子节点）
const filterAsyncRouter = (asyncRouterMap) => { 
  //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.map(route => {
    let menuObj = {}
    menuObj.component =  route.component === 'Layout' ? require('@/layout').default : require('@/views' + route.component ).default
    // let comp = (route.component === 'Layout' || route.component === 'layout') ? '@/layout' : `@/views/${route.component}`
    // menuObj.component = ()=>{ import (comp) }
    menuObj.name = _.trimStart(route.path, '/');
    menuObj.path = route.path
    menuObj.type = route.type
    menuObj.hidden = route.hidden === '0' ? false : true
    menuObj.redirect = route.redirect
    menuObj.meta = {
      title: route.name || '',
      icon: route.icon || '',
      keepAlive : route.keepAlive === '0' ? true : false,
      breadcrumb: route.breadcrumb === '0' ? true : false
    }
    if (route.children && route.children.length) {
      menuObj.children = filterAsyncRouter(route.children)
    }
    return menuObj
  })
  return accessedRouters
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_TRUENAME: (state, trueName) => {
    state.trueName = trueName
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles; //菜单显示,404最后加入
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username, password: password }).then(res => {
        commit('SET_TOKEN', res)
        setToken(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log("请求用户信息")   //不要删除
      getInfo(state.token).then(res => {
        const { aclTree, trueName, username } = res
        if (!aclTree || aclTree.length <= 0) {
          reject('没有菜单')
        }
        let menu = filterAsyncRouter(aclTree);
        menu = [...constantRoutes,...menu,...notFoundRouter]
        router.addRoutes(menu)
        resolve(menu)
        commit('SET_ROLES', menu)
        commit('SET_USERNAME', username)
        commit('SET_TRUENAME', trueName)
        
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
}

export default {
  userNamespaced: true,
  state,
  mutations,
  actions
}

