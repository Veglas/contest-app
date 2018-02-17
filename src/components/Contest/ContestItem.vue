<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>

        <v-card>
          <v-card-media height="480" :src="item.imageUrl"></v-card-media>
          <v-card-text>
            <div class="grey--text">
              ID участника: <b>{{ item.creatorId }}</b>
              <br>
              Время загрузки: <i>{{ item.date | date }}</i>
            </div>
          </v-card-text>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      item () {
        return this.$store.getters.loadedItem(this.id)
      }
    }
  }
</script>

<style scoped>
</style>
