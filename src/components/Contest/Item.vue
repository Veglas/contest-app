<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>

        <v-card>
          <v-card-title>
            <span class="mr-3">ID билета:</span>
            <span class="title">{{ item.id }}</span>
          </v-card-title>
          <v-card-media height="480" :src="item.imageUrl">

            <v-spacer v-if="userIsCreator"/>

            <v-btn fab v-if="userIsCreator">
              <v-icon>mode_edit</v-icon>
            </v-btn>

          </v-card-media>
          <v-card-text>
            ID участника: <b>{{ item.creatorId }}</b>
            <br>
            Время загрузки: <i>{{ item.date | date }}</i>
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
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.item.creatorId
      }
    }
  }
</script>

<style scoped>
</style>
