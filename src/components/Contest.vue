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

        <v-tabs v-model="active">
          <v-tabs-bar class="amber">
            <v-tabs-item
              v-for="tab in tabs"
              :key="tab"
              :href="'#' + tab"
              ripple
            >
              Название {{ tab.slice(-1) }}
            </v-tabs-item>
            <v-tabs-slider color="black"></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content
              v-for="tab in tabs"
              :key="tab"
              :id="tab"
            >
              <v-card>
                <v-card-text>{{ text }}</v-card-text>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>
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
        tabs: ['tab-1', 'tab-2', 'tab-3'],
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
