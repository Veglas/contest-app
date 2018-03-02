<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <v-container grid-list-md>
              <v-layout row wrap>

                <v-flex xs12 sm6>
                  <h1>Победители</h1>
                </v-flex>

                <v-flex xs12 sm6 class="text-sm-right">
                  <btn-create-item/>
                </v-flex>

                <v-flex xs12 v-if="loading">

                  <v-progress-circular
                    indeterminate
                    :size="150"
                    color="amber"
                  />

                </v-flex>

                <v-flex xs12 v-else>

                  <h2>Победитель конкурса</h2>
                  <v-layout wrap>
                    <list-item
                      v-for="i in items"
                      v-if="i.isHidden && i.isWinnerContest"
                      :key="i.id"
                      :i="i"
                    />
                  </v-layout>

                  <h2>Победители месяца</h2>
                  <v-layout wrap>
                    <list-item
                      v-for="i in items"
                      v-if="i.isHidden && i.isWinnerMonth"
                      :key="i.id"
                      :i="i"
                    />
                  </v-layout>

                  <h2>Победители недели</h2>
                  <v-layout wrap>
                    <list-item
                      v-for="i in items"
                      v-if="i.isHidden && i.isWinnerWeek"
                      :key="i.id"
                      :i="i"
                    />
                  </v-layout>

                </v-flex>

              </v-layout>
            </v-container>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
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
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>
</style>

