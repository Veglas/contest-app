import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Winners from '@/components/Lottery/Winners'
import Rules from '@/components/Lottery/Rules'
import CreateTicket from '@/components/Lottery/CreateTicket'
import Ticket from '@/components/Lottery/Ticket'
import Register from '@/components/User/Register'
import Login from '@/components/User/Login'
import Profile from '@/components/User/Profile'
import ProfileOpen from '@/components/User/ProfileOpen'
import Tickets from '@/components/Admin/Tickets'
import Lotteries from '@/components/Admin/Lotteries'
import AuthGuard from './auth-guard'
// import AdminGuard from './admin-guard'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
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
      path: '/lottery/winners',
      name: 'Winners',
      component: Winners
    },
    {
      path: '/lottery/rules',
      name: 'Rules',
      component: Rules
    },
    {
      path: '/lottery/create-ticket',
      name: 'CreateTicket',
      component: CreateTicket,
      beforeEnter: AuthGuard
    },
    {
      path: '/lottery/ticket/:id',
      name: 'Ticket',
      component: Ticket,
      props: true
    },
    {
      path: '/user/profile/:id',
      name: 'ProfileOpen',
      component: ProfileOpen,
      props: true
      // beforeEnter: AuthGuard
    },
    {
      path: '/user/profile',
      name: 'Profile',
      component: Profile
      // beforeEnter: AuthGuard
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
      path: '/admin',
      name: 'Tickets',
      component: Tickets
      // beforeEnter: AuthGuard
      // beforeEnter: AdminGuard
    },
    {
      path: '/admin/lotteries',
      name: 'Lotteries',
      component: Lotteries
      // beforeEnter: AuthGuard
      // beforeEnter: AdminGuard
    }
  ]
})
