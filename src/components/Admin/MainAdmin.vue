<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>

        <v-card>
          <v-card-text>

            <v-progress-circular
              v-if="loading"
              indeterminate
              :size="150"
              color="amber"
            />

            <v-layout wrap v-else>

              <v-flex xs12>
                <h1>Админ</h1>
              </v-flex>

              <v-flex xs12>
                <h4>Все билеты</h4>
              </v-flex>

              <v-flex xs12 md3>
                <div><b>Дата</b></div>
                <div v-for="i in items" :key="i.id" v-if="i.isHidden">{{ i.date | date }}</div>
              </v-flex>

              <v-flex xs12 md3>
                <div><b>ID билета</b></div>
                <div v-for="i in items" :key="i.id" v-if="i.isHidden">
                  <a @click="onLoadItem(i.id)">{{ i.id }}</a>
                </div>
              </v-flex>

              <v-flex xs12 md4>
                <div><b>ID юзера</b></div>
                <div v-for="i in items" :key="i.id" v-if="i.isHidden">{{ i.creatorId }}</div>
              </v-flex>

              <v-flex xs12 md2>
                <div><b>Победитель</b></div>
                <div v-for="i in items" :key="i.id" v-if="i.isHidden">

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
        logoutBtn: {title: 'Выйти', icon: 'exit_to_app'}
      }
    },
    computed: {
      items () {
        return this.$store.getters.loadedSortedByDateItems
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
