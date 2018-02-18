<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <v-card>
          <v-card-text>

            <h1>Профиль</h1>

            <v-container grid-list-md>
              <v-layout row wrap>

                <v-flex xs12>
                  <h4>Ваш ID</h4>
                  <p><i>{{ $store.getters.user.id }}</i></p>
                </v-flex>

                <v-flex xs12>
                  <v-btn large color="success" class="mx-0" :to="createItemBtn.url">
                    <v-icon left>{{ createItemBtn.icon }}</v-icon>
                    {{ createItemBtn.title }}
                  </v-btn>
                </v-flex>

                <v-flex xs12>
                  <h4>Ваши билеты</h4>
                </v-flex>

                <v-flex xs6 v-for="i in items" :key="i.id" v-if="user.id === i.creatorId">
                  <v-card class="mb-3">
                    <v-card-media
                      height="200"
                      style="cursor: pointer"
                      @click="onLoadItem(i.id)"
                      v-ripple
                      :src="i.imageUrl">

                      <v-spacer/>

                      <v-btn
                        small
                        fab
                        class="btn-edit"
                        @click="onLoadItem(i.id)">
                        <v-icon>settings</v-icon>
                      </v-btn>

                    </v-card-media>
                    <v-card-text class="pa-1">
                      <b>{{ i.id }}</b>
                      <br>
                      <i>{{ i.date | date }}</i>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex xs12 class="text-xs-right">
                  <v-btn flat class="mx-0" @click="onLogout">
                    <v-icon left>{{ logoutBtn.icon }}</v-icon>
                    {{ logoutBtn.title }}
                  </v-btn>
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
    data () {
      return {
        createItemBtn: {title: 'Участвовать', url: '/contest/create-item', icon: 'file_upload'},
        logoutBtn: {title: 'Выйти', icon: 'exit_to_app'}
      }
    },
    computed: {
      items () {
        return this.$store.getters.userCreatedItems
      },
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      onLoadItem (id) {
        this.$router.push('/contest/item/' + id)
      },
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/contest')
      }
    }
  }
</script>

<style scoped>
</style>
