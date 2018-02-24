<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>

        <v-card>
          <v-card-text>
            <div class="buttons-group">

              <v-spacer/>

              <v-btn fab v-if="currentUserId === 'toxjaps6DjgDKrju6hf6Iq2e9FR2'" color="warning">
                <v-icon>security</v-icon>
              </v-btn>

              <v-btn fab v-if="userIsCreator">
                <v-icon>mode_edit</v-icon>
              </v-btn>

            </div>
            <img :src="item.imageUrl" style="max-width: 100%">
            <br>
            ID билета: <b>{{ item.id }}</b>
            <br>
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
      },
      currentUserId () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id
      }
    }
  }
</script>

<style scoped>
  .buttons-group {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
