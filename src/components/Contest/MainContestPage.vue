<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <v-container grid-list-md>
              <v-layout row wrap>

                <v-flex xs12 sm6>
                  <h1>Все билеты</h1>
                </v-flex>

                <v-flex xs12 sm6 class="text-sm-right">
                  <v-btn large color="success" class="mx-0" :to="createItemBtn.url">
                    <v-icon left>{{ createItemBtn.icon }}</v-icon>
                    {{ createItemBtn.title }}
                  </v-btn>
                </v-flex>

                <v-flex xs12>
                  <span>Список билетов, учавствующих в розыгрыше</span>
                </v-flex>

                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  :size="150"
                  color="amber"
                />

                <v-layout wrap v-else>
                  <v-flex xs12 sm6 md3 v-for="i in items" :key="i.id">
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

                        <v-tooltip top v-if="currentUserId === i.creatorId">
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
                      <v-card-text class="pa-2">
                        <b>{{ i.id }}</b>
                        <br>
                        <i>{{ i.date | date }}</i>
                      </v-card-text>
                    </v-card>
                  </v-flex>

                </v-layout>
              </v-layout>
            </v-container>

            <!--<div class="text-xs-center">-->
              <!--<v-pagination-->
                <!--:length="15"-->
                <!--v-model="page"-->
                <!--:total-visible="7"-->
                <!--color="success"-->
              <!--/>-->
            <!--</div>-->

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
        createItemBtn: {title: 'Участвовать', icon: 'mdi-upload', url: '/contest/create-item'}
      }
    },
    computed: {
      items () {
        return this.$store.getters.loadedSortedByDateItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      currentUserId () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadItem (id) {
        this.$router.push('/contest/item/' + id)
      }
    }
  }
</script>

<style scoped>
</style>
