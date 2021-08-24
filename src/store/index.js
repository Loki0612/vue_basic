import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import settings from './modules/settings'
import user from './modules/user'
import hospital from './modules/hospital'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    settings,
    user,
    hospital
  },
  getters
})

export default store
