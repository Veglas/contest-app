<template>
  <div class="lottery-page">
    <v-container>
      <v-layout>
        <v-flex xs12 md10 offset-md1>

          <v-progress-circular
            v-if="loading"
            indeterminate
            :size="40"
            color="amber"
          />

          <v-card v-else>
            <!-- <v-card-media :src="'/static/img/logos/veglas-watermark-1300x420.png'">
              <v-spacer/>

              <data-lottery
                :lottery="lottery"
              />

              <remove-lottery
                :lottery="lottery"
              />
            </v-card-media> -->
            <v-card-text class="pt-0">

              <div class="ticket__edit text-xs-right" v-if="userIsAdmin">

                <data-lottery
                  :lottery="lottery"
                />

                <edit-lottery-image-dialog
                  :lottery="lottery"
                />

                <remove-lottery
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
                <h1>{{ lottery.name }}</h1>
                <div v-html="lottery.rules"/>
              </div>
            </v-card-text>
          </v-card>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      lottery () {
        return this.$store.getters.loadedLottery(this.id)
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
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
  /* .lottery-page .card__media__background {
    background-position-y: -10px !important;
    background-size: 80% !important;
  } */
</style>
