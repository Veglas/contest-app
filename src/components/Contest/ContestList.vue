<template>

  <v-container>
    <v-layout>
      <v-flex>
        <h1>Конкурс</h1>

        <v-toolbar class="amber">
          <v-btn>Учавствовать</v-btn>
          <v-btn>Загрузить</v-btn>
          <v-btn to="/contest/rules">Правила</v-btn>
        </v-toolbar>

        <br>

        <v-tabs
          v-model="active"
          color="cyan"
          dark
          slider-color="yellow"
        >
          <v-tab
            v-for="n in 3"
            :key="n"
            ripple
          >
            Item {{ n }}
          </v-tab>
          <v-tab-item
            v-for="n in 3"
            :key="n"
          >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>

        <br>

        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs6 md3 v-for="i in items" :key="i.id">

              <v-card class="mb-3">
                <v-card-media
                  height="200"
                  style="cursor: pointer"
                  @click="onLoadItem(i.id)"
                  v-ripple
                  :src="i.imageUrl"></v-card-media>
                <v-card-text class="pa-1">
                  <div class="grey--text text-xs-center">
                    <i>{{ i.date | date }}</i>
                  </div>
                </v-card-text>
              </v-card>

            </v-flex>
          </v-layout>
        </v-container>

      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    data () {
      return {
        active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    computed: {
      items () {
        return this.$store.getters.loadedSortedItems
      }
    },
    methods: {
      onLoadItem (id) {
        this.$router.push('/contest/' + id)
      }
    }
  }
</script>

<style scoped>
</style>
