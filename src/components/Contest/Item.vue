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

            <div class="winners-group">

              <div v-if="item.isWinnerContest">
                <v-chip color="teal darken-1 white--text">
                  <v-icon left>mdi-crown</v-icon>
                  <span>{{ item.isWinnerContest }}</span>
                </v-chip>
              </div>

              <div v-if="item.isWinnerMonth">
                <v-chip color="green darken-1 white--text">
                  <v-icon left>mdi-crown</v-icon>
                  <span>{{ item.isWinnerMonth }}</span>
                </v-chip>
              </div>

              <div v-if="item.isWinnerWeek">
                <v-chip color="light-green darken-1 white--text">
                  <v-icon left>mdi-crown</v-icon>
                  <span>{{ item.isWinnerWeek }}</span>
                </v-chip>
              </div>

              <div v-if="!item.isHidden">
                <v-chip color="warning white--text">
                  <v-icon left>mdi-eye-off</v-icon>
                  <span>Ожидает модерации</span>
                </v-chip>
              </div>

              <div v-else>
                <v-chip color="success white--text">
                  <v-icon left>mdi-eye</v-icon>
                  <span>Билет участвует</span>
                </v-chip>
              </div>

            </div>

            <div class="buttons-group text-xs-right">
              <edit-winner-dialog
                v-if="currentUserId === 'toxjaps6DjgDKrju6hf6Iq2e9FR2'"
                :item="item"
              />
              <delete-item-dialog
                v-if="userIsCreator || currentUserId === 'toxjaps6DjgDKrju6hf6Iq2e9FR2'"
                :item="item"
              />
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
  .winners-group {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .buttons-group {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
  }
</style>
