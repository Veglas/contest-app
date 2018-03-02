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

              <v-tooltip
                v-if="item.isWinnerContest"
                top
                color="teal darken-1 white--text"
                open-delay="0"
              >
                <div slot="activator">
                  <v-chip color="teal darken-1 white--text">
                    <v-icon left>mdi-crown</v-icon>
                    <span>{{ item.isWinnerContest }}</span>
                  </v-chip>
                </div>
                <span>Победитель розыгрыша</span>
              </v-tooltip>

              <v-tooltip
                v-if="item.isWinnerMonth"
                top
                color="green darken-1 white--text"
                open-delay="0"
              >
                <div slot="activator">
                  <v-chip color="green darken-1 white--text">
                    <v-icon left>mdi-crown</v-icon>
                    <span>{{ item.isWinnerMonth }}</span>
                  </v-chip>
                </div>
                <span>Победитель месяца</span>
              </v-tooltip>

              <v-tooltip
                v-if="item.isWinnerWeek"
                top
                color="light-green darken-1 white--text"
                open-delay="0"
              >
                <div slot="activator">
                  <v-chip color="light-green darken-1 white--text">
                    <v-icon left>mdi-crown</v-icon>
                    <span>{{ item.isWinnerWeek }}</span>
                  </v-chip>
                </div>
                <span>Победитель недели</span>
              </v-tooltip>

              <v-tooltip
                v-if="!item.isHidden"
                top
                color="warning white--text"
                open-delay="0"
              >
                <div slot="activator">
                  <v-chip
                    small
                    color="warning white--text"
                  >
                    <v-icon>mdi-eye-off</v-icon>
                  </v-chip>
                </div>
                <span>Билет ожидает модерации</span>
              </v-tooltip>

              <v-tooltip
                v-else
                top
                color="success white--text"
                open-delay="0"
              >
                <div slot="activator">
                  <v-chip
                    small
                    color="success white--text"
                  >
                    <v-icon>mdi-eye</v-icon>
                  </v-chip>
                </div>
                <span>Билет прошел модерацию</span>
              </v-tooltip>

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
            <div style="font-size: 12px">
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
  }
  .buttons-group {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
