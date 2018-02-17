import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Contest from '@/components/Contest'
import Item from '@/components/Item'
import Register from '@/components/User/Register'
import Login from '@/components/User/Login'
import Profile from '@/components/User/Profile'
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
      name: 'Register',
      component: Register
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/profile',
      name: 'Profile',
      component: Profile
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
