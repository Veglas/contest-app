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
import EditLotteryDialog from './components/Edit/EditLotteryDialog'
import DeleteTicketDialog from './components/Edit/DeleteTicketDialog'
import RemoveLotteryDialog from './components/Edit/RemoveLotteryDialog'
import ModerateTicketDialog from './components/Edit/ModerateTicketDialog'
import ListItem from './components/Lottery/ListItem'
import TicketListBtn from './components/Lottery/TicketListBtn'
import BtnCreateTicket from './components/Shared/BtnCreateTicket'
import BtnCreateLottery from './components/Shared/BtnCreateLottery'
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
Vue.component('edit-lottery-dialog', EditLotteryDialog)
Vue.component('delete-ticket-dialog', DeleteTicketDialog)
Vue.component('remove-lottery-dialog', RemoveLotteryDialog)
Vue.component('moderate-ticket-dialog', ModerateTicketDialog)
Vue.component('list-item', ListItem)
Vue.component('ticket-list-btn', TicketListBtn)
Vue.component('btn-create-ticket', BtnCreateTicket)
Vue.component('btn-create-lottery', BtnCreateLottery)
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
    this.$store.dispatch('loadLotteries')
  }
})
