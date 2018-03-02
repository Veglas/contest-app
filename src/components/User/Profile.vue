<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <h1>Профиль</h1>

            <v-progress-circular
              v-if="loading"
              indeterminate
              :size="150"
              color="amber"
            />

            <v-container grid-list-md v-else>
              <v-layout row wrap>

                <v-flex xs12>
                  <h4>Ваш ID</h4>
                  <p><i>{{ $store.getters.user.id }}</i></p>
                </v-flex>

                <v-flex xs12>
                  <btn-create-item/>
                </v-flex>

                <v-flex xs12>
                  <h4>Ваши билеты</h4>
                </v-flex>

                <v-layout wrap>
                  <list-item
                    v-for="i in items"
                    :i="i"
                    :key="i.id"
                    v-if="user.id === i.creatorId"
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
    data () {
      return {
        logoutBtn: {title: 'Выйти', icon: 'mdi-exit-to-app'}
      }
    },
    computed: {
      items () {
        return this.$store.getters.userCreatedItems
      },
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
</style>
