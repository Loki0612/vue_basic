/*
 * @Description: Loading
 * @Author: yzw
 * @Date: 2021-03-18 13:46:21
 * @LastEditTime: 2021-08-12 16:54:59
 * @LastEditors: yzw
 * @Reference:
 */
import { Loading } from 'element-ui'
import _ from 'lodash'

let loading = null
let needRequestCount = 0

// 开启loading状态
const startLoading = () => {
    loading = Loading.service({
        lock: true,
        background: 'rgba(255,255,255,0.5)'
    })
}

// 关闭loading状态
const endLoading = _.debounce(() => {
    loading && loading.close()
    loading = null
}, 300)

export const showScreenLoading = () => {
    if (needRequestCount === 0 && !loading) {
        startLoading()
    }
    needRequestCount++
}

export const hideScreenLoading = () => {
    if (needRequestCount >= 0) { needRequestCount-- }
    needRequestCount = Math.max(needRequestCount, 0)
    if (needRequestCount === 0) {
        endLoading()
    }
}
export default {}
