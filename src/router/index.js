import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../views/Welcome'

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
      btn: Btns
    }
  },
  {
    path: '/home',
    components: {
      main: CategoriesTable,
      btn: LogoutBtn,
    }
  },
  {
    path: '/public',
    components: {
      main: PublicTable,
      btn: LogoutBtn,
    }
  },
  {
    path: '/papers',
    components: {
      main: PapersTable,
      btn: LogoutBtn,
    }
  }
]

export default new Router({
  mode: 'history',
  routes
})