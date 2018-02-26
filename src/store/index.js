import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    user: null,
    loading: false,
    error: null,
    loadedItems: [
      {
        id: '00000003',
        imageUrl: 'https://content.sentimony.com/assets/img/releases/large/sencd025/zymosis-insight.jpg',
        creatorId: 'user3333',
        date: '2018-02-09',
        isWinnerWeek: false,
        isWinnerMonth: false,
        isWinnerContest: false,
        isHidden: false
      }
    ]
  },

  mutations: {
    setLoadedItems (state, payload) {
      state.loadedItems = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    createItem (state, payload) {
      state.loadedItems.push(payload)
    },
    updateTicket (state, payload) {
      const item = state.loadedItems.find(item => {
        return item.id === payload.id
      })
      item.isWinnerWeek = payload.isWinnerWeek
      item.isWinnerMonth = payload.isWinnerMonth
      item.isWinnerContest = payload.isWinnerContest
      item.isHidden = payload.isHidden
    },
    removeTicket (state, payload) {
      const index = state.loadedItems.findIndex(item => {
        return item.id === payload
      })
      if (index !== -1) {
        state.loadedItems.splice(index, 1)
      }
    }
  },

  actions: {
    loadItems ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('items').once('value')
        .then((data) => {
          const items = []
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              creatorId: obj[key].creatorId,
              imageUrl: obj[key].imageUrl,
              byUser: obj[key].byUser,
              date: obj[key].date,
              isWinnerWeek: obj[key].isWinnerWeek,
              isWinnerMonth: obj[key].isWinnerMonth,
              isWinnerContest: obj[key].isWinnerContest,
              isHidden: obj[key].isHidden
            })
          }
          commit('setLoadedItems', items)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createItem ({commit, getters}, payload) {
      const item = {
        creatorId: getters.user.id,
        date: payload.date.toISOString(),
        isWinnerWeek: payload.isWinnerWeek,
        isWinnerMonth: payload.isWinnerMonth,
        isWinnerContest: payload.isWinnerContest,
        isHidden: payload.isHidden
      }
      let imageUrl
      let key
      firebase.database().ref('items').push(item)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('items/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('items').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createItem', {
            ...item,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateTicketData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      updateObj.isWinnerWeek = payload.isWinnerWeek
      updateObj.isWinnerMonth = payload.isWinnerMonth
      updateObj.isWinnerContest = payload.isWinnerContest
      updateObj.isHidden = payload.isHidden
      firebase.database().ref('items').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateTicket', payload)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    removeTicketData ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('items').child(payload.id).remove()
        .then(() => {
          commit('removeTicket', payload.id)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredItems: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredItems: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoLogin ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredItems: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },

  getters: {
    loadedItems (state) {
      return state.loadedItems
    },
    loadedSortedByDateItems (state, getters) {
      return getters.loadedItems.sort((itemA, itemB) => {
        return new Date(itemA.date) - new Date(itemB.date)
      }).reverse()
    },
    loadedLastFewItems (state, getters) {
      return getters.loadedSortedByDateItems.slice(0, 6)
    },
    userCreatedItems (state, getters) {
      return getters.loadedSortedByDateItems
    },
    loadedItem (state) {
      return (itemId) => {
        return state.loadedItems.find((item) => {
          return item.id === itemId
        })
      }
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }

})
