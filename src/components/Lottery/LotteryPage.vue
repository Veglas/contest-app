<template>
  <div class="lottery-page">
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex xs12>

          <v-progress-circular
            v-if="loading"
            indeterminate
            :size="40"
            color="amber"
          />

          <v-card v-else>
            <!-- <v-card-title class="headline">
            </v-card-title> -->
            <v-card-media :src="lottery.imageUrl" height="350">
              <v-spacer/>
              <data-lottery :lottery="lottery" v-if="userIsAdmin"/>
              <edit-lottery-image-dialog :lottery="lottery" v-if="userIsAdmin"/>
              <remove-lottery :lottery="lottery" v-if="userIsAdmin"/>
            </v-card-media>
            <v-card-text>

              <!-- <div class="text-xs-right" v-if="userIsAdmin">

                <data-lottery :lottery="lottery"/>
                <edit-lottery-image-dialog :lottery="lottery"/>
                <remove-lottery :lottery="lottery"/>
                <create-ticket-dialog :lottery="lottery"/>

              </div>

              <div class="text-xs-center">
                <img
                  class="lottery__img"
                  v-if="lottery.imageUrl"
                  :src="lottery.imageUrl"
                />
              </div> -->

                <v-layout wrap row>
                  <v-flex xs12 sm9>
                    <h1>
                      <!-- <v-icon large>mdi-trophy</v-icon> -->
                      {{ lottery.name }}
                    </h1>
                  </v-flex>
                  <v-flex xs12 sm3>
                    <create-ticket-dialog :lottery="lottery"/>

                    <v-btn
                      color="warning"
                      class="mx-0"
                    >
                      <v-icon left>mdi-crown</v-icon>
                      Победители
                    </v-btn>

                  </v-flex>
                  <v-flex xs12 sm9>
                    <div>Билеты, участвующие в розыгрыше:</div>
                    <v-layout wrap>
                      <list-item
                        v-for="i in items"
                        v-if="i.lotteryId === lottery.id && i.isModerated || i.lotteryId === lottery.id && currentUserId === i.creatorId || i.lotteryId === lottery.id && userIsAdmin"
                        :i="i"
                        :key="i.id"
                      />
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm3>
                    <h3 class="mt-2 mb-4">
                      <v-icon small>mdi-file-document-box</v-icon>
                      Правила
                    </h3>
                    <div v-html="lottery.rules"/>
                    <p>
                      <b>ВНИМАНИЕ:</b><br>
                      В случае сомнения в правдоподобности скрина и того что он сделан с вашего акаунта, мы можем попросить расшарить экран в скайпе. Это делается для борьбы с фейками. Все фэйки будут удаляться и банится по IP.
                    </p>
                  </v-flex>
                  </v-layout>

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
      items () {
        return this.$store.getters.loadedSortedByDateItems
      },
      lottery () {
        return this.$store.getters.loadedLottery(this.id)
      },
      currentUserId () {
        return this.$store.getters.currentUserId
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
  .lottery-page .card__media__background {
    /* background-position: center !important; */
    /* background-position-y: -10px !important;
    background-size: 80% !important; */
  }
</style>
