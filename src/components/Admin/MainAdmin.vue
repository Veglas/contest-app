<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-text>

            <h1>Админ</h1>

            <v-container grid-list-md>
              <v-layout row wrap>

                <v-flex xs12>
                  <h4>Все билеты</h4>
                </v-flex>

                <v-flex xs12 sm3>
                  <div><b>Дата</b></div>
                  <div v-for="i in items" :key="i.id">{{ i.date | date }}</div>
                </v-flex>

                <v-flex xs12 sm3>
                  <div><b>ID билета</b></div>
                  <div v-for="i in items" :key="i.id">{{ i.id }}</div>
                </v-flex>

                <v-flex xs12 sm3>
                  <div><b>ID юзера</b></div>
                  <div v-for="i in items" :key="i.id">{{ i.creatorId }}</div>
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
        logoutBtn: {title: 'Выйти', icon: 'exit_to_app'}
      }
    },
    computed: {
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

<style scoped>
</style>
