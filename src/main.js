/*
 * @Description:
 * @Author: yzw
 * @Date: 2020-06-23 06:15:04
 * @LastEditTime: 2021-08-20 10:06:57
 * @LastEditors: yzw
 * @Reference:
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import moment from 'moment'
import _ from 'lodash'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import common from '@/config/common'
import tableHeight from '@/utils/tableHeight'

Vue.prototype.common = common
Vue.prototype._ = _
Vue.prototype.moment = moment

const screenWidth = document.documentElement.clientWidth
const elementConfig = { zIndex: 3000, size: 'large' }
if (screenWidth >= 1920) {
	elementConfig.size = 'medium'
} else if (screenWidth >= 1680) {
	elementConfig.size = 'medium'
} else if (screenWidth >= 1600) {
	elementConfig.size = 'medium'
} else if (screenWidth >= 1440) {
	elementConfig.size = 'small'
} else if (screenWidth >= 1366) {
	elementConfig.size = 'small'
} else if (screenWidth >= 1280) {
	elementConfig.size = 'small'
} else if (screenWidth >= 1024) {
	elementConfig.size = 'mini'
} else {
	elementConfig.size = 'mini'
}

Vue.use(tableHeight)
Vue.use(ElementUI, elementConfig)
Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
