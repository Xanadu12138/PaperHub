// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true // 允许携带cookies
axios.defaults.baseURL='http://localhost:8000'
// axios.defaults.baseURL='http://www.xanadu.ml:8000'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

Vue.use(Buefy)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
