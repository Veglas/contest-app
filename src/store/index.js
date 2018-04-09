import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    loading: false,
    user: null,
    admins: [
      'toxjaps6DjgDKrju6hf6Iq2e9FR2',
      'Ba1ck1rpfbUjXA6oWmdm1LreTmr1',
      'dNED1SUnJfe3ZhFiQMf9yc2mK5w2'
    ],
    error: null,
    loadedItems: [],
    loadedLotteries: []
    // loadedUsers: []
  },

  mutations: {
    setLoadedItems (state, payload) {
      state.loadedItems = payload
    },
    setLoadedLotteries (state, payload) {
      state.loadedLotteries = payload
    },
    // setLoadedUsers (state, payload) {
    //   state.loadedUsers = payload
    // },
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
    createTicket (state, payload) {
      state.loadedItems.push(payload)
    },
    createLottery (state, payload) {
      state.loadedLotteries.push(payload)
    },
    // addTicketIdToLottery (state, payload) {
    //   state.loadedLotteryTickets.push(payload)
    // },
    updateTicketWinner (state, payload) {
      const item = state.loadedItems.find(item => {
        return item.id === payload.id
      })
      item.isWinnerWeek = payload.isWinnerWeek
      item.isWinnerMonth = payload.isWinnerMonth
      item.isWinnerContest = payload.isWinnerContest
    },
    updateTicketModerate (state, payload) {
      const item = state.loadedItems.find(item => {
        return item.id === payload.id
      })
      item.isModerated = payload.isModerated
    },
    updateLotteryData (state, payload) {
      const item = state.loadedLotteries.find(item => {
        return item.id === payload.id
      })
      item.name = payload.name
      item.rules = payload.rules
    },
    updateLotteryImage (state, payload) {
      const item = state.loadedLotteries.find(item => {
        return item.id === payload.id
      })
      item.imageUrl = payload.imageUrl
    },
    updateTicketImage (state, payload) {
      const item = state.loadedItems.find(item => {
        return item.id === payload.id
      })
      item.imageUrl = payload.imageUrl
    },
    removeTicket (state, payload) {
      const index = state.loadedItems.findIndex(item => {
        return item.id === payload
      })
      if (index !== -1) {
        state.loadedItems.splice(index, 1)
      }
    },
    removeLottery (state, payload) {
      const index = state.loadedLotteries.findIndex(lottery => {
        return lottery.id === payload
      })
      if (index !== -1) {
        state.loadedLotteries.splice(index, 1)
      }
    }
  },

  actions: {
    // loadUsers ({commit}) {
    //   commit('setLoading', true)
    //   firebase.auth().getAllUsers()
    //     .then((data) => {
    //       const users = []
    //       const obj = data.val()
    //       for (let key in obj) {
    //         users.push({
    //           id: key
    //         })
    //       }
    //       commit('setLoadedUsers', users)
    //       commit('setLoading', false)
    //     })
    //     .catch(
    //       (error) => {
    //         console.log(error)
    //         commit('setLoading', false)
    //       }
    //     )
    // },
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
              date: obj[key].date,
              lotteryId: obj[key].lotteryId,
              isWinnerWeek: obj[key].isWinnerWeek,
              isWinnerMonth: obj[key].isWinnerMonth,
              isWinnerContest: obj[key].isWinnerContest,
              isModerated: obj[key].isModerated
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
    createTicket ({commit, getters}, payload) {
      const item = {
        creatorId: getters.user.id,
        date: payload.date.toISOString(),
        lotteryId: payload.lotteryId,
        isWinnerWeek: payload.isWinnerWeek,
        isWinnerMonth: payload.isWinnerMonth,
        isWinnerContest: payload.isWinnerContest,
        isModerated: payload.isModerated
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
          return firebase.storage().ref('items/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('items').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createTicket', {
            ...item,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateTicketModerate ({commit}, payload) {
      const updateObj = {}
      updateObj.isModerated = payload.isModerated
      firebase.database().ref('items').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateTicketModerate', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateTicketWinner ({commit}, payload) {
      const updateObj = {}
      updateObj.isWinnerWeek = payload.isWinnerWeek
      updateObj.isWinnerMonth = payload.isWinnerMonth
      updateObj.isWinnerContest = payload.isWinnerContest
      firebase.database().ref('items').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateTicketWinner', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateTicketImage ({commit}, payload) {
      // commit('setLoading', true)
      const updateObj = {}
      let imageUrl
      let key
      firebase.database().ref('items').child(payload.id).update(updateObj)
        // .then(() => {
        //   const imageUrl = payload.imageUrl
        //   const extWithMeta = imageUrl.slice(imageUrl.lastIndexOf('.'))
        //   const ext = extWithMeta.slice(0, extWithMeta.lastIndexOf('?'))
        //   return firebase.storage().ref('items/' + payload.id + '.' + ext).delete()
        // })
        .then((data) => {
          key = payload.id
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('items/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('items').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('updateTicketImage', {
            ...updateObj,
            imageUrl: imageUrl,
            id: key
          })
          // commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          // commit('setLoading', false)
        })
    },
    removeTicket ({commit}, payload) {
      // commit('setLoading', true)
      firebase.database().ref('items').child(payload.id).remove()
        .then(() => {
          const imageUrl = payload.imageUrl
          const extWithMeta = imageUrl.slice(imageUrl.lastIndexOf('.'))
          const ext = extWithMeta.slice(0, extWithMeta.lastIndexOf('?'))
          return firebase.storage().ref('items/' + payload.id + ext).delete()
        })
        .then(() => {
          commit('removeTicket', payload.id)
          // commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          // commit('setLoading', false)
        })
    },
    loadLotteries ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('lotteries').once('value')
        .then((data) => {
          const items = []
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              name: obj[key].name,
              rules: obj[key].rules,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date
            })
          }
          commit('setLoadedLotteries', items)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createLottery ({commit, getters}, payload) {
      const item = {
        name: payload.name,
        rules: payload.rules,
        date: payload.date.toISOString()
      }
      let imageUrl
      let key
      firebase.database().ref('lotteries').push(item)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('lotteries/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('lotteries').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createLottery', {
            ...item,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateLotteryData ({commit}, payload) {
      const updateObj = {}
      updateObj.name = payload.name
      updateObj.rules = payload.rules
      firebase.database().ref('lotteries').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateLotteryData', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateLotteryImage ({commit}, payload) {
      // commit('setLoading', true)
      const updateObj = {}
      let imageUrl
      let key
      firebase.database().ref('lotteries').child(payload.id).update(updateObj)
        // .then(() => {
        //   const imageUrl = payload.imageUrl
        //   const extWithMeta = imageUrl.slice(imageUrl.lastIndexOf('.'))
        //   const ext = extWithMeta.slice(0, extWithMeta.lastIndexOf('?'))
        //   return firebase.storage().ref('lotteries/' + payload.id + '.' + ext).delete()
        // })
        .then((data) => {
          key = payload.id
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('lotteries/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('lotteries').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('updateLotteryImage', {
            ...updateObj,
            imageUrl: imageUrl,
            id: key
          })
          // commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          // commit('setLoading', false)
        })
    },
    removeLottery ({commit}, payload) {
      // commit('setLoading', true)
      firebase.database().ref('lotteries').child(payload.id).remove()
        .then(() => {
          const imageUrl = payload.imageUrl
          const extWithMeta = imageUrl.slice(imageUrl.lastIndexOf('.'))
          const ext = extWithMeta.slice(0, extWithMeta.lastIndexOf('?'))
          return firebase.storage().ref('lotteries/' + payload.id + ext).delete()
        })
        .then(() => {
          commit('removeLottery', payload.id)
          // commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          // commit('setLoading', false)
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
              email: user.email
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
              email: user.email
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
      commit('setUser', {
        id: payload.uid,
        email: payload.email,
        registeredItems: []
      })
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
    // Билеты
    loadedItems (state) {
      return state.loadedItems
    },
    loadedSortedByDateItems (state, getters) {
      return getters.loadedItems.sort((itemA, itemB) => {
        return new Date(itemA.date) - new Date(itemB.date)
      }).reverse()// || {}
    },
    loadedLastFewItems (state, getters) {
      return getters.loadedSortedByDateItems.slice(0, 7)
    },
    userCreatedItems (state, getters) {
      return getters.loadedSortedByDateItems
    },
    loadedIsNotModeratedItems (state, getters) {
      return getters.loadedSortedByDateItems.filter(item => {
        return !item.isModerated
      })
    },
    loadedIsModeratedItems (state, getters) {
      return getters.loadedSortedByDateItems.filter(item => {
        return item.isModerated
      })
    },
    loadedTicket (state) {
      return (itemId) => {
        return state.loadedItems.find((item) => {
          return item.id === itemId
        })// || {}
      }
    },
    // Лотереи
    loadedLotteries (state) {
      return state.loadedLotteries
    },
    loadedLotteriesSortedByDate (state, getters) {
      return getters.loadedLotteries.sort((itemA, itemB) => {
        return new Date(itemA.date) - new Date(itemB.date)
      }).reverse()
    },
    loadedLottery (state) {
      return (itemId) => {
        return state.loadedLotteries.find((item) => {
          return item.id === itemId
        })// || {}
      }
    },
    // Юзеры
    // loadedUsers (state) {
    //   return state.loadedUsers
    // },
    // Вошедший юзер
    user (state) {
      return state.user
    },
    userIsAuthenticated (state, getters) {
      return !!getters.user
    },
    currentUserId (state, getters) {
      if (!getters.userIsAuthenticated) {
        return false
      }
      return getters.user && getters.user.id
    },
    userIsAdmin (state, getters) {
      if (state.admins.findIndex((admin) => {
        return admin === getters.currentUserId
      }) === -1) {
        return false
      }
      return true
    },
    // Ошибки
    error (state) {
      return state.error
    },
    // Загрузка
    loading (state) {
      return state.loading
    }
  }

})
