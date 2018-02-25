<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-layout wrap>

              <v-flex xs12>
                <h1>Админ</h1>
              </v-flex>

              <v-flex xs12>
                <h4>Все билеты</h4>
              </v-flex>

              <v-flex xs12 md2>
                <div><b>Дата</b></div>
                <div v-for="i in items" :key="i.id">{{ i.date | date }}</div>
              </v-flex>

              <v-flex xs12 md3>
                <div><b>ID билета</b></div>
                <div v-for="i in items" :key="i.id">
                  <a @click="onLoadItem(i.id)">{{ i.id }}</a>
                </div>
              </v-flex>

              <v-flex xs12 md4>
                <div><b>ID юзера</b></div>
                <div v-for="i in items" :key="i.id">{{ i.creatorId }}</div>
              </v-flex>

              <v-flex xs12 md1>
                <div><b>Победитель</b></div>
                <div v-for="i in items" :key="i.id">
                  <v-icon style="font-size: 20px">mdi-crown</v-icon>
                </div>
              </v-flex>

              <v-flex xs12 md2>
                <div><b>Пометка</b></div>
                <div v-for="i in items" :key="i.id">Победитель Март'18</div>
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
