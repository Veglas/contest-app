<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md8 offset-md2 lg6 offset-lg3>
        <v-card>
          <v-card-text>

            <h1>Профиль</h1>

            <v-container grid-list-md>
              <v-layout row wrap>

                <v-flex xs12>
                  <h4>Ваш ID</h4>
                  <p><i>{{ $store.getters.user.id }}</i></p>
                </v-flex>

                <v-flex xs12>
                  <v-btn large color="success" class="mx-0" :to="createItemBtn.url">
                    <v-icon left>{{ createItemBtn.icon }}</v-icon>
                    {{ createItemBtn.title }}
                  </v-btn>
                </v-flex>

                <v-flex xs12>
                  <h4>Ваши билеты</h4>
                </v-flex>

                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  :size="150"
                  color="amber"
                />

                <v-layout wrap v-else>
                  <v-flex xs12 sm6 v-for="i in items" :key="i.id" v-if="user.id === i.creatorId">
                    <v-card class="mb-3">
                      <v-card-media
                        height="200"
                        style="cursor: pointer"
                        @click="onLoadItem(i.id)"
                        v-ripple
                        :src="i.imageUrl"
                      >

                        <div class="winners-group" v-if="i.isWinnerContest || i.isWinnerMonth || i.isWinnerWeek">

                          <div v-if="i.isWinnerContest">
                            <v-chip
                              small
                              color="teal darken-1 white--text"
                              @click="onLoadItem(i.id)"
                              style="cursor: pointer"
                            >
                              <v-icon left>mdi-crown</v-icon>
                              <span>{{ i.isWinnerContest }}</span>
                            </v-chip>
                          </div>

                          <div v-if="i.isWinnerMonth">
                            <v-chip
                              small
                              color="green darken-1 white--text"
                              @click="onLoadItem(i.id)"
                              style="cursor: pointer"
                            >
                              <v-icon left>mdi-crown</v-icon>
                              <span>{{ i.isWinnerMonth }}</span>
                            </v-chip>
                          </div>

                          <div v-if="i.isWinnerWeek">
                            <v-chip
                              small
                              color="light-green darken-1 white--text"
                              @click="onLoadItem(i.id)"
                              style="cursor: pointer"
                            >
                              <v-icon left>mdi-crown</v-icon>
                              <span>{{ i.isWinnerWeek }}</span>
                            </v-chip>
                          </div>

                        </div>

                        <v-spacer/>

                        <v-tooltip top>
                          <v-btn
                            small
                            fab
                            slot="activator"
                            color="info"
                            @click="onLoadItem(i.id)">
                            <v-icon>mdi-account</v-icon>
                          </v-btn>
                          <span>Ваш билет</span>
                        </v-tooltip>

                      </v-card-media>
                      <v-card-text class="pa-1">
                        <b>{{ i.id }}</b>
                        <br>
                        <i>{{ i.date | date }}</i>
                      </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 class="text-xs-right">
                    <v-btn flat class="mx-0" @click="onLogout">
                      <v-icon left>{{ logoutBtn.icon }}</v-icon>
                      {{ logoutBtn.title }}
                    </v-btn>
                  </v-flex>

                </v-layout>
              </v-layout>
            </v-container>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        createItemBtn: {title: 'Участвовать', icon: 'mdi-upload', url: '/contest/create-item'},
        logoutBtn: {title: 'Выйти', icon: 'mdi-exit-to-app'}
      }
    },
    computed: {
      items () {
        return this.$store.getters.userCreatedItems
      },
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadItem (id) {
        this.$router.push('/contest/item/' + id)
      },
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/contest')
      }
    }
  }
</script>

<style scoped>
</style>
