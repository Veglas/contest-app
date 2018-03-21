import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueAnalytics from 'vue-analytics'
import VueYandexMetrika from 'vue-yandex-metrika'

import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert'
import EditTicketDialog from './components/Edit/EditTicketDialog'
import DeleteTicketDialog from './components/Edit/DeleteTicketDialog'
import ModerateTicketDialog from './components/Edit/ModerateTicketDialog'
import ListItem from './components/Lottery/ListItem'
import BtnCreateTicket from './components/Shared/BtnCreateTicket'
import BtnRules from './components/Shared/BtnRules'
import BtnWinners from './components/Shared/BtnWinners'

Vue.use(Vuetify)
Vue.use(VueAnalytics, {
  id: 'UA-112607536-2',
  router,
  autoTracking: {
    pageviewOnLoad: true
  }
})
Vue.use(VueYandexMetrika, {
  id: 48127781,
  router: router,
  env: process.env.NODE_ENV
})

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('edit-ticket-dialog', EditTicketDialog)
Vue.component('delete-ticket-dialog', DeleteTicketDialog)
Vue.component('moderate-ticket-dialog', ModerateTicketDialog)
Vue.component('list-item', ListItem)
Vue.component('btn-create-ticket', BtnCreateTicket)
Vue.component('btn-rules', BtnRules)
Vue.component('btn-winners', BtnWinners)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDTdXvAr2HSiwcZfWFQ5RKkdv-Hefq-zHA',
      authDomain: 'veglas-db.firebaseapp.com',
      databaseURL: 'https://veglas-db.firebaseio.com',
      projectId: 'veglas-db',
      storageBucket: 'gs://veglas-db.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
      }
    })
    this.$store.dispatch('loadItems')
  }
})
