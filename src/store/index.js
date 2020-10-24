import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // login user information
    userInfo: {
      userID: '',
      userName: '',
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    clearUserInfo (state) {
      state.userInfo.userID = ''
      state.userInfo.userName = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
