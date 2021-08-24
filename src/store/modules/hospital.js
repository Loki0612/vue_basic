/*
 * @Author: your name
 * @Date: 2021-03-09 16:54:06
 * @LastEditTime: 2021-03-18 17:45:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \recovery_management\src\store\modules\hospital.js
 */
import { getHospitalInfo, updateHospitalInfo } from '@/api/hospital'

const state = {
    hospitalInfo:{
        appDownloadAddress: '',     //app下载地址
        hospitalAddress: '',        //医院地址
        hospitalEmail: '',          //医院邮箱
        hospitalFax: '',            //医院传真
        hospitalName: '',           //医院名称
        hospitalPhone: '',          //医院电话
        hospitalPrincipal: '',      //负责人
        hospitalRemark: '',         //备注  
        systemName: '',             //系统名称
        logo:'',                    //LOGO
    }
}

const mutations = {
    UPDATE_HOSPITAL_INFO : (state,obj)=>{
      state.hospitalInfo = obj  
    },
    SAVE_HOSPITAL_INFO : (state,obj)=>{
      state.hospitalInfo = obj  
    },
}

const actions = {
  getHosInfo({commit}){
    return new Promise((resolve,reject)=>{
        getHospitalInfo().then((res)=>{
            commit('UPDATE_HOSPITAL_INFO', res)
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
  },
  saveHosInfo({commit}, data){
    return new Promise((resolve,reject)=>{
      updateHospitalInfo(data).then((res)=>{
          commit('SAVE_HOSPITAL_INFO', res)
          resolve(res)
      }).catch(err=>{
          reject(err)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

