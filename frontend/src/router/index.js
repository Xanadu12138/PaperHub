import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

import Welcome from '../views/Welcome'
import Admin from '../views/Admin'
import Comments from '../views/Comments'
import LoginAdmin from '../views/LoginAdmin.vue'

import CategoriesTable from '../components/tables/CategoriesTable'
import PublicTable from '../components/tables/PublicTable'
import PapersTable from '../components/tables/PapersTable'

import LogoutBtn from '../components/navbar/LogoutBtn'
import Btns from '../components/navbar/Btns'


Vue.use(Router)

const routes = [
  {
    path: '/',
    components: {
      main: Welcome,
      btn: Btns,
    },
    meta: {
      requireAuth: false,
      requireAdmin: false
    }
  },
  {
    path: '/home',
    components: {
      main: CategoriesTable,
      btn: LogoutBtn,
    },
    meta: {
      requireAuth: true,
      requireAdmin: false
    }
  },
  {
    path: '/public',
    components: {
      main: PublicTable,
      btn: LogoutBtn,
    },
    meta: {
      requireAuth: true,
      requireAdmin: false
    }
  },
  {
    path: '/papers',
    components: {
      main: PapersTable,
      btn: LogoutBtn,
    },
    meta: {
      requireAuth: true,
      requireAdmin: false
    }
  },
  {
    path: '/comments',
    components: {
      main: Comments,
      btn: LogoutBtn,
    },
    meta: {
      requireAuth: true,
      requireAdmin: false
    }
  },
  {
    path: '/adminlogin',
    components: {
      main: LoginAdmin,
    },
    meta: {
      requireAuth: false,
      requireAdmin: false
    }
  },
  {
    path: '/adminpage',
    components: {
      main: Admin
    },
    meta: {
      requireAuth: false,
      requireAdmin: true
    }
  },
]


const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.userInfo.userStatus == true) {
      next()
    } else {
      alert('请先登录')
      next('/')
    }
  }
  else if (to.meta.requireAdmin) {
    if (store.state.adminInfo.adminStatus == true) {
      next()
    } else {
      alert('请先登录管理员账号')
      next('/')
    }
  }
  else
    next()
})

export default router