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

            <div class="ticket__edit text-xs-right" v-if="userIsAdmin">

              <edit-lottery-dialog
                :lottery="lottery"
              />

              <remove-lottery-dialog
                :lottery="lottery"
              />

            </div>

            <div class="text-xs-center">
              <img
                class="lottery__img"
                v-if="lottery.imageUrl"
                :src="lottery.imageUrl"
              />
            </div>

            <div style="font-size: 12px">
              <b>{{ lottery.name }}</b>
              <br>
              {{ lottery.rules }}
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
      loading () {
        return this.$store.getters.loading
      },
      lottery () {
        console.log(this.$store.getters.loadedLottery(this.id))
        return this.$store.getters.loadedLottery(this.id)
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
  .lottery__img {
    max-width: 100%;
    margin: 0 auto 8px;
    display: block;
  }
</style>
