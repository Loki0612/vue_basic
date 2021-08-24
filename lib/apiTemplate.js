/*
 * @Description: 模板接口
 * @Author: yzw
 * @Date: 2021-08-23 08:59:04
 * @LastEditTime: 2021-08-24 12:08:42
 * @LastEditors: yzw
 * @Reference:
 */
module.exports = {
	template: config => {
        let insert = ``
        let detail = ``
        if (config.dialog.includes('add')) {
            insert = `
/**
 * @description: 新增${config.remark}数据
 */
export function insertData(data) {
    return request({
        url: '',
        method: 'POST',
        data,
        showLoading: true
    })
}

/**
 * @description: 修改${config.remark}数据
 */
export function editData(data) {
    return request({
        url: '',
        method: 'POST',
        data,
        showLoading: true
    })
}
            `
        }
        if (config.dialog.includes('detail')) {
            detail = `
/**
 * @description: 获取${config.remark}详情数据
 */
export function getDetail(data) {
    return request({
        url: '',
        method: 'GET',
        params: data,
        showLoading: true
    })
}
            `
        }
        const template = `
/**
 * 页面: ${config.remark}
 * pageName: ${config.fileName}
 **/
import request from '@/utils/request'

/**
 * @description: 获取${config.remark}列表数据
 */
export function getList(data) {
    return request({
        url: '',
        method: 'GET',
        params: data,
        showLoading: true
    })
}
${insert}
${detail}
/**
 * @description: 删除${config.remark}数据
 */
    export function deleteData(data) {
    return request({
        url: '',
        method: 'POST',
        data,
        showLoading: true
    })
}
        `
        return template
    }
}
