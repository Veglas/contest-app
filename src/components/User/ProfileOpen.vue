<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12>
                  <h1>
                    <v-icon large>mdi-account-circle</v-icon>
                    Участник
                  </h1>
                </v-flex>

              </v-layout>
            </v-container>

            <v-progress-circular
              v-if="loading"
              indeterminate
              :size="40"
              color="amber"
            />

            <v-container grid-list-md v-else>
              <v-layout wrap>

                <v-flex xs12>
                  <h4>ID участника</h4>
                  <p><i>{{ id }}</i></p>
                </v-flex>

                <v-flex xs12 v-if="userIsAdmin">
                  <h4>
                    <v-icon>mdi-security</v-icon>
                    Email участника
                  </h4>
                  <p>
                    тут:
                    <a href="https://console.firebase.google.com/u/0/project/veglas-db/authentication/users?hl=ru"
                      target="_blank"
                    >
                      Firebase Authentication
                    </a>
                  </p>
                </v-flex>

                <v-flex xs12>
                  <h4>Билеты участника</h4>
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
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
</style>
