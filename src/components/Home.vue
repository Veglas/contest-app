<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>

                <v-flex xs12 sm6>
                  <h1>Победители</h1>
                </v-flex>

                <v-flex xs12 sm6 class="text-sm-right">
                  <v-btn large color="success" class="mx-0" :to="createItemBtn.url">
                    <v-icon left>{{ createItemBtn.icon }}</v-icon>
                    {{ createItemBtn.title }}
                  </v-btn>
                </v-flex>

                <v-flex xs12>
                  <span>Список билетов, победивших в розыгрыше</span>
                </v-flex>

                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  :size="150"
                  color="amber"
                />

                <v-flex v-else xs12 sm6 md3 v-for="i in items" :key="i.id" v-if="i.isWinnerContest || i.isWinnerMonth || i.isWinnerWeek">
                  <v-card class="mb-3">
                    <v-card-media
                      height="200"
                      style="cursor: pointer"
                      @click="onLoadItem(i.id)"
                      v-ripple
                      :src="i.imageUrl"
                    >

                      <div class="winners-group" v-if="i.isWinnerContest || i.isWinnerMonth || i.isWinnerWeek">
                        <v-chip
                          v-if="i.isWinnerContest"
                          small
                          fab
                          slot="activator"
                          class="btn-edit"
                          color="teal darken-1 white--text"
                          @click="onLoadItem(i.id)"
                          style="cursor: pointer"
                        >
                          <v-icon left>mdi-crown</v-icon>
                          {{ i.isWinnerContest }}
                        </v-chip>

                        <v-chip
                          v-if="i.isWinnerMonth"
                          small
                          fab
                          slot="activator"
                          class="btn-edit"
                          color="green darken-1 white--text"
                          @click="onLoadItem(i.id)"
                          style="cursor: pointer"
                        >
                          <v-icon left>mdi-crown</v-icon>
                          {{ i.isWinnerMonth }}
                        </v-chip>

                        <v-chip
                          v-if="i.isWinnerWeek"
                          small
                          ma-1
                          fab
                          slot="activator"
                          class="btn-edit"
                          color="light-green darken-1 white--text"
                          @click="onLoadItem(i.id)"
                          style="cursor: pointer"
                        >
                          <v-icon left>mdi-crown</v-icon>
                          {{ i.isWinnerWeek }}
                        </v-chip>
                      </div>

                      <v-spacer/>

                      <v-tooltip top>
                        <v-btn
                          v-if="currentUserId === i.creatorId"
                          small
                          fab
                          slot="activator"
                          class="btn-edit"
                          color="warning"
                          @click="onLoadItem(i.id)">
                          <v-icon>mdi-settings</v-icon>
                        </v-btn>
                        <span>Редактировать</span>
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
            </v-container>
            <v-container>
              <v-layout>

                <v-flex xs10 offset-xs1 sm4 offset-sm4 class="text-xs-center">
                  <h1>Новые билеты</h1>
                  <v-card>
                    <v-progress-circular
                      v-if="loading"
                      indeterminate
                      :size="170"
                      color="amber"
                    />
                    <v-card-media v-else>
                      <v-carousel class="my-carousel">
                        <v-carousel-item
                          v-for="i in items2"
                          lazy
                          light
                          :src="i.imageUrl"
                          :key="i.id"
                        >
                          <div
                            class="my-carousel-bg-link"
                            v-ripple
                            @click="onLoadItem(i.id)"
                          />
                        </v-carousel-item>
                      </v-carousel>
                    </v-card-media>
                  </v-card>
                </v-flex>

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
        createItemBtn: {title: 'Участвовать', url: '/contest/create-item', icon: 'file_upload'}
      }
    },
    computed: {
      items () {
        return this.$store.getters.loadedSortedByDateItems
      },
      items2 () {
        return this.$store.getters.loadedLastFewItems
      },
      loading () {
        return this.$store.getters.loading
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

<style>
  .my-carousel {
    height: 220px;
  }
  .my-carousel-bg-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
</style>
