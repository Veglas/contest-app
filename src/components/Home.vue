<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <v-container grid-list-md>
              <v-layout row wrap>

                <v-flex xs12 sm6>
                  <h1>Все билеты</h1>
                </v-flex>

                <v-flex xs12 sm6 class="text-sm-right">
                  <btn-create-item/>
                </v-flex>

                <v-flex xs12>
                  <span>Список билетов, участвующих в розыгрыше</span>
                </v-flex>

                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  :size="150"
                  color="amber"
                />

                <v-layout wrap v-else>
                  <list-item
                    v-for="i in items"
                    v-if="i.isModerated || currentUserId === i.creatorId || userIsAdmin"
                    :i="i"
                    :key="i.id"
                  />
                </v-layout>

              </v-layout>
            </v-container>

            <!--<div class="text-xs-center">-->
            <!--<v-pagination-->
            <!--:length="15"-->
            <!--v-model="page"-->
            <!--:total-visible="7"-->
            <!--color="success"-->
            <!--/>-->
            <!--</div>-->

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      items () {
        return this.$store.getters.loadedSortedByDateItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      currentUserId () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id
      },
      userIsAdmin () {
        if (this.currentUserId === 'toxjaps6DjgDKrju6hf6Iq2e9FR2' || this.currentUserId === 'Ba1ck1rpfbUjXA6oWmdm1LreTmr1' || this.currentUserId === 'dNED1SUnJfe3ZhFiQMf9yc2mK5w2') {
          return true
        }
      }
    }
  }
</script>

<style scoped>
</style>
