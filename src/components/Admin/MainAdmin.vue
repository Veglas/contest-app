<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>

        <v-card>
          <v-card-text>

            <v-layout wrap>
              <v-flex xs12>
                <h1>Админ</h1>
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
                <br>
                <h2>
                  <v-chip small color="success white--text">
                    <v-icon>mdi-eye</v-icon>
                  </v-chip>
                  <snap>Билеты, прошедшие модерацию</snap>
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
                <div v-for="i in items" :key="i.id" v-if="i.isModerated">{{ i.creatorId }}</div>
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

              <v-flex xs12 class="text-xs-center">
                <br>
                <h2>
                  <v-chip small color="warning white--text">
                    <v-icon>mdi-eye-off</v-icon>
                  </v-chip>
                  <snap>Билеты, нуждающиеся в модерации</snap>
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
                <div v-for="i in items" :key="i.id" v-if="!i.isModerated">{{ i.creatorId }}</div>
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

            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
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
        this.$router.push('/contest/item/' + id)
      }
    }
  }
</script>

<style>
</style>
