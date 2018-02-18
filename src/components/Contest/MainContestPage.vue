<template>

  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <v-container grid-list-md>
              <v-layout row wrap>

                <v-flex xs12 sm6>
                  <h1>Конкурс</h1>
                </v-flex>

                <v-flex xs12 sm6 class="text-sm-right">
                  <v-btn large color="success" class="mx-0" :to="createItemBtn.url">
                    <v-icon left>{{ createItemBtn.icon }}</v-icon>
                    {{ createItemBtn.title }}
                  </v-btn>
                </v-flex>

                <v-flex xs12>
                  <span>Недавно загруженные билеты, учавствующие в розыгрыше</span>
                </v-flex>

                <v-flex xs12 sm6 md3 v-for="i in items" :key="i.id">
                  <v-card class="mb-3">
                    <v-card-media
                      height="200"
                      style="cursor: pointer"
                      @click="onLoadItem(i.id)"
                      v-ripple
                      :src="i.imageUrl">

                      <v-spacer v-if="currentUserId === i.creatorId"/>

                      <v-btn
                        v-if="userIsAuthenticated && currentUserId === i.creatorId"
                        small
                        fab
                        class="btn-edit"
                        @click="onLoadItem(i.id)">
                        <v-icon>settings</v-icon>
                      </v-btn>
                    </v-card-media>
                    <v-card-text class="pa-2">
                      <b>{{ i.id }}</b>
                      <br>
                      <i>{{ i.date | date }}</i>
                    </v-card-text>
                  </v-card>
                </v-flex>

              </v-layout>
            </v-container>

            <div class="text-xs-center">
              <v-pagination
                :length="15"
                v-model="page"
                :total-visible="7"
                color="success"
              />
            </div>

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
        page: 1,
        createItemBtn: {title: 'Участвовать', url: '/contest/create-item', icon: 'file_upload'}
      }
    },
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
      }
    },
    methods: {
      onLoadItem (id) {
        this.$router.push('/contest/item/' + id)
      }
    }
  }
</script>

<style scoped>
</style>
