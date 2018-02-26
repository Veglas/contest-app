import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert'
import EditWinnerDialog from './components/Edit/EditWinnerDialog'
import DeleteItemDialog from './components/Edit/DeleteItemDialog'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('edit-winner-dialog', EditWinnerDialog)
Vue.component('delete-item-dialog', DeleteItemDialog)

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
