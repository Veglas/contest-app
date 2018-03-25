<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>

        <v-card>
          <v-card-text>

            <v-layout wrap>

              <v-flex>
                <v-btn flat :to="adminTicketsBtn.url" class="primary ml-0" exact>
                  <v-icon left>{{ adminTicketsBtn.icon }}</v-icon>
                  <span>{{ adminTicketsBtn.title }}</span>
                </v-btn>

                <v-btn flat :to="adminLotteriesBtn.url" class="primary ml-0">
                  <v-icon left>{{ adminLotteriesBtn.icon }}</v-icon>
                  <span>{{ adminLotteriesBtn.title }}</span>
                </v-btn>
              </v-flex>

              <v-flex xs12>
                <h1>Билеты</h1>
              </v-flex>

            </v-layout>

            <v-progress-circular
              v-if="loading"
              indeterminate
              :size="150"
              color="amber"
            />

            <v-layout wrap v-else>

              <v-flex xs12 class="text-xs-center">
                <h2>
                  <v-chip small color="warning white--text">
                    <v-icon>mdi-eye-off</v-icon>
                  </v-chip>
                  <span>Билеты, нуждающиеся в модерации</span>
                </h2>
              </v-flex>

              <v-flex xs12 md3>
                <div><b>Дата</b></div>
                <div v-for="i in items" :key="i.id" v-if="!i.isModerated">{{ i.date | date }}</div>
              </v-flex>

              <v-flex xs12 md3>
                <div><b>ID билета</b></div>
                <div v-for="i in items" :key="i.id" v-if="!i.isModerated">
                  <a @click="onLoadItem(i.id)">{{ i.id }}</a>
                </div>
              </v-flex>

              <v-flex xs12 md4>
                <div><b>ID юзера</b></div>
                <div v-for="i in items" :key="i.id" v-if="!i.isModerated">
                  <a @click="onLoadUser(i.creatorId)">{{ i.creatorId }}</a>
                </div>
              </v-flex>

              <v-flex xs12 md2>
                <div><b>Победитель</b></div>
                <div v-for="i in items" :key="i.id" v-if="!i.isModerated">

                  <span>

                    <v-tooltip top v-if="i.isWinnerWeek" color="light-green darken-1" open-delay="0">
                      <v-icon style="font-size: 20px" color="light-green darken-1" slot="activator">mdi-crown</v-icon>
                      <span>{{ i.isWinnerWeek }}</span>
                    </v-tooltip>
                    <v-icon v-else style="font-size: 20px" color="grey lighten-2">mdi-crown</v-icon>

                    <v-tooltip top v-if="i.isWinnerMonth" color="green darken-1" open-delay="0">
                      <v-icon style="font-size: 20px" color="green darken-1" slot="activator">mdi-crown</v-icon>
                      <span>{{ i.isWinnerMonth }}</span>
                    </v-tooltip>
                    <v-icon v-else style="font-size: 20px" color="grey lighten-2">mdi-crown</v-icon>

                    <v-tooltip top v-if="i.isWinnerContest" color="teal darken-1" open-delay="0">
                      <v-icon style="font-size: 20px" color="teal darken-1" slot="activator">mdi-crown</v-icon>
                      <span>{{ i.isWinnerContest }}</span>
                    </v-tooltip>
                    <v-icon v-else style="font-size: 20px" color="grey lighten-2">mdi-crown</v-icon>

                  </span>
                  <br>

                </div>
              </v-flex>

              <v-flex xs12 class="text-xs-center">
                <h2>
                  <v-chip small color="success white--text">
                    <v-icon>mdi-eye</v-icon>
                  </v-chip>
                  <span>Билеты, прошедшие модерацию</span>
                </h2>
              </v-flex>

              <v-flex xs12 md3>
                <div><b>Дата</b></div>
                <div v-for="i in items" :key="i.id" v-if="i.isModerated">{{ i.date | date }}</div>
              </v-flex>

              <v-flex xs12 md3>
                <div><b>ID билета</b></div>
                <div v-for="i in items" :key="i.id" v-if="i.isModerated">
                  <a @click="onLoadItem(i.id)">{{ i.id }}</a>
                </div>
              </v-flex>

              <v-flex xs12 md4>
                <div><b>ID юзера</b></div>
                <div v-for="i in items" :key="i.id" v-if="i.isModerated">
                  <a @click="onLoadUser(i.creatorId)">{{ i.creatorId }}</a>
                </div>
              </v-flex>

              <v-flex xs12 md2>
                <div><b>Победитель</b></div>
                <div v-for="i in items" :key="i.id" v-if="i.isModerated">

                  <span>

                    <v-tooltip top v-if="i.isWinnerWeek" color="light-green darken-1" open-delay="0">
                      <v-icon style="font-size: 20px" color="light-green darken-1" slot="activator">mdi-crown</v-icon>
                      <span>{{ i.isWinnerWeek }}</span>
                    </v-tooltip>
                    <v-icon v-else style="font-size: 20px" color="grey lighten-2">mdi-crown</v-icon>

                    <v-tooltip top v-if="i.isWinnerMonth" color="green darken-1" open-delay="0">
                      <v-icon style="font-size: 20px" color="green darken-1" slot="activator">mdi-crown</v-icon>
                      <span>{{ i.isWinnerMonth }}</span>
                    </v-tooltip>
                    <v-icon v-else style="font-size: 20px" color="grey lighten-2">mdi-crown</v-icon>

                    <v-tooltip top v-if="i.isWinnerContest" color="teal darken-1" open-delay="0">
                      <v-icon style="font-size: 20px" color="teal darken-1" slot="activator">mdi-crown</v-icon>
                      <span>{{ i.isWinnerContest }}</span>
                    </v-tooltip>
                    <v-icon v-else style="font-size: 20px" color="grey lighten-2">mdi-crown</v-icon>

                  </span>
                  <br>

                </div>
              </v-flex>

            </v-layout>
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
        adminTicketsBtn: {title: 'Билеты', icon: 'mdi-cash-multiple', url: '/admin'},
        adminLotteriesBtn: {title: 'Лотереи (Work In Progress)', icon: 'mdi-trophy', url: '/admin/lotteries'}
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      items () {
        return this.$store.getters.loadedSortedByDateItems
      }
    },
    methods: {
      onLoadItem (id) {
        this.$router.push('/lottery/ticket/' + id)
      },
      onLoadUser (creatorId) {
        this.$router.push('/user/profile/' + creatorId)
      }
    }
  }
</script>

<style>
</style>
