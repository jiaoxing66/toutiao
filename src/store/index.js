import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)

const TOKEN_KEY = 'TOKEN_USER' // 好处:保存token+获取token名字不一致的时候直接就报错,方便找bug
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      setItem(TOKEN_KEY, user)
    }
  },
  actions: {},
  modules: {}
})
