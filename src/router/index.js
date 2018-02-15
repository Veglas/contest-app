import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Contest from '@/components/Contest'
import Item from '@/components/Item'
import UserRegister from '@/components/UserRegister'
import UserLogin from '@/components/UserLogin'
import UserCreateItem from '@/components/UserCreateItem'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/contest',
      name: 'Contest',
      component: Contest
    },
    {
      path: '/contest/:id',
      name: 'Item',
      props: true,
      component: Item
    },
    {
      path: '/user/register',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/user/login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/user/create-item',
      name: 'UserCreateItem',
      component: UserCreateItem,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
