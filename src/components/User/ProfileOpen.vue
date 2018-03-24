<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12>
                  <h1>Юзер</h1>
                </v-flex>

              </v-layout>
            </v-container>

            <v-progress-circular
              v-if="loading"
              indeterminate
              :size="150"
              color="amber"
            />

            <v-container grid-list-md v-else>
              <v-layout wrap>

                <v-flex xs12>
                  <h4>ID юзера</h4>
                  <p><i>{{ id }}</i></p>
                </v-flex>

                <v-flex xs12 v-if="userIsAdmin">
                  <h4>
                    <v-icon>mdi-security</v-icon>
                    Email юзера
                  </h4>
                  <p><i>Work In Progress . . .</i></p>
                </v-flex>

                <v-flex xs12>
                  <h4>Билеты юзера</h4>
                </v-flex>

                <v-layout wrap>
                  <list-item
                    v-for="i in items"
                    v-if="id === i.creatorId"
                    :i="i"
                    :key="i.id"
                  />
                </v-layout>

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
    props: ['id'],
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

<style>
</style>
