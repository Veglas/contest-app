import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Winners from '@/components/Contest/Winners'
import CreateItem from '@/components/Contest/CreateItem'
import Item from '@/components/Contest/Item'
import Register from '@/components/User/Register'
import Login from '@/components/User/Login'
import Profile from '@/components/User/Profile'
import MainAdmin from '@/components/Admin/MainAdmin'
import AuthGuard from './auth-guard'
// import AdminGuard from './admin-guard'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
      // beforeEnter: function (to, from, next) {
      //   if (to.name === 'Home') {
      //     this.a.app.$store.dispatch('loadItems')
      //   }
      //   next()
      // }.bind(this)
    },
    {
      path: '/winners',
      name: 'Winners',
      component: Winners
    },
    {
      path: '/contest/create-item',
      name: 'CreateItem',
      component: CreateItem,
      beforeEnter: AuthGuard
    },
    {
      path: '/contest/item/:id',
      name: 'Item',
      component: Item,
      props: true
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
      // beforeEnter: AuthGuard
    },
    {
      path: '/admin',
      name: 'MainAdmin',
      component: MainAdmin
      // beforeEnter: AuthGuard
      // beforeEnter: AdminGuard
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
