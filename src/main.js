import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert'
import DialogByAdmin from './components/Edit/DialogByAdmin'
import DialogByUser from './components/Edit/DialogByUser'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('edit-dialog-by-admin', DialogByAdmin)
Vue.component('edit-dialog-by-user', DialogByUser)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
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
