import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ContestList from '@/components/Contest/ContestList'
import ContestItem from '@/components/Contest/ContestItem'
import ContestCreateItem from '@/components/Contest/ContestCreateItem'
import Register from '@/components/User/Register'
import Login from '@/components/User/Login'
import Profile from '@/components/User/Profile'
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
      name: 'ContestList',
      component: ContestList
    },
    {
      path: '/contest/:id',
      name: 'ContestItem',
      component: ContestItem,
      props: true
    },
    {
      path: '/contest/create-item',
      name: 'ContestCreateItem',
      component: ContestCreateItem,
      beforeEnter: AuthGuard
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
      component: Profile,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
