import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueAnalytics from 'vue-analytics'
import VueYandexMetrika from 'vue-yandex-metrika'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert'
import WinnerTicket from './components/Edit/Ticket/Winner'
import RemoveTicket from './components/Edit/Ticket/Remove'
import EditLotteryImageDialog from './components/Edit/EditLotteryImageDialog'
import EditTicketImageDialog from './components/Edit/EditTicketImageDialog'
import DataLottery from './components/Edit/Lottery/Data'
import RemoveLottery from './components/Edit/Lottery/Remove'
import ModerateTicket from './components/Edit/Ticket/Moderate'
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
Vue.use(Croppa)

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('winner-ticket', WinnerTicket)
Vue.component('data-lottery', DataLottery)
Vue.component('edit-lottery-image-dialog', EditLotteryImageDialog)
Vue.component('edit-ticket-image-dialog', EditTicketImageDialog)
Vue.component('remove-ticket', RemoveTicket)
Vue.component('remove-lottery', RemoveLottery)
Vue.component('moderate-ticket', ModerateTicket)
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
