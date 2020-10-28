import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  // 处理刷新state清空
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
      // login user information
      userInfo: {
        userStatus: false,
        userID: '',
      },
      adminInfo: {
        adminStatus: false
      }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    clearUserInfo (state) {
      state.userInfo.userStatus = false
      state.userInfo.userID = ''
    },
    setAdminInfo (state, adminInfo) {
      state.adminInfo = adminInfo
    },
    clearAdminInfo (state) {
      state.adminInfo.adminStatus = false
    }
  },
  actions: {
  },
  modules: {
  }
})
