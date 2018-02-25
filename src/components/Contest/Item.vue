<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>

        <v-progress-circular
          v-if="loading"
          indeterminate
          :size="150"
          color="amber"
        />

        <v-card v-else>
          <v-card-text>

            <div class="extra-slot text-xs-right">
              <div class="winners-group">
                <v-chip
                  v-if="item.isWinnerContest"
                  color="teal darken-1 white--text"
                >
                  <v-icon left>mdi-crown</v-icon>
                  <span>{{ item.isWinnerContest }}</span>
                </v-chip>
                <v-chip
                  v-if="item.isWinnerMonth"
                  color="green darken-1 white--text"
                >
                  <v-icon left>mdi-crown</v-icon>
                  <span>{{ item.isWinnerMonth }}</span>
                </v-chip>
                <v-chip
                  v-if="item.isWinnerWeek"
                  color="light-green darken-1 white--text"
                >
                  <v-icon left>mdi-crown</v-icon>
                  <span>{{ item.isWinnerWeek }}</span>
                </v-chip>
              </div>
              <div class="buttons-group">
                <edit-by-admin
                  v-if="currentUserId === 'toxjaps6DjgDKrju6hf6Iq2e9FR2'"
                  :item="item"
                />
                <edit-by-user
                  v-if="userIsCreator"
                  :item="item"
                />
              </div>
            </div>

            <img :src="item.imageUrl" style="max-width: 100%">
            <br>
            ID билета: <b>{{ item.id }}</b>
            <br>
            ID участника: <b>{{ item.creatorId }}</b>
            <br>
            Время загрузки: <i>{{ item.date | date }}</i>
            <!--<br>-->
            <!--isWinnerWeek: <i>{{ item.isWinnerWeek }}</i>-->
            <!--<br>-->
            <!--isWinnerMonth: <i>{{ item.isWinnerMonth }}</i>-->
            <!--<br>-->
            <!--isWinnerContest: <i>{{ item.isWinnerContest }}</i>-->
            <!--<br>-->
            <!--isHidden: <i>{{ item.isHidden }}</i>-->
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
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>
  .extra-slot {
    position: absolute;
    top: 0;
    right: 0;
  }
  .buttons-group {
  }
  .winners-group {
  }
</style>
