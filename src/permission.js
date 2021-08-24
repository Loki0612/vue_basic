/*
 * @LastEditors: yzw
 * @Author: Richardlv
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // clearPending()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const roles = store.getters.roles

      const toDeepth = to.path.split('/').length
      const fromDeepth = from.path.split('/').length
      if (toDeepth < fromDeepth) {
        from.meta.keepAlive = false
        to.meta.keepAlive = true
      }

      if (roles.length > 2) {
        next()
      } else {
        store.dispatch('getInfo').then(res => {
          // router.addRoutes(res)
          console.log('ROUTER-----------------------', router.options.routes)
          next(to.fullPath)
        }).catch(e => {
          console.error('当前用户无权限', e)
          next('/login')
        })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
