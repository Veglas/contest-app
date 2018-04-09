<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12 class="text-md-right">
                  <!-- <btn-winners/> -->
                  <!-- <btn-rules/> -->
                  <btn-create-ticket/>
                </v-flex>

                <v-flex xs12>
                  <h1>
                    <v-icon large>mdi-trophy</v-icon>
                    Розыгрыши:
                  </h1>
                </v-flex>

                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  :size="40"
                  color="amber"
                />

                <v-layout wrap v-else>
                  <lottery-list-item
                    v-for="lottery in lotteries"
                    :lottery="lottery"
                    :key="lottery.id"
                  />
                </v-layout>

                <v-flex xs12>
                  <h1>
                    <v-icon large>mdi-trophy</v-icon>
                    {{ lotteryDay.title }}
                  </h1>
                  <h3>Новые билеты, участвующие в розыгрыше</h3>
                </v-flex>

                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  :size="40"
                  color="amber"
                />

                <v-layout wrap v-else>
                  <list-item
                    v-for="i in items"
                    v-if="i.isModerated || currentUserId === i.creatorId || userIsAdmin"
                    :i="i"
                    :key="i.id"
                  />
                  <ticket-list-btn
                    :btn="lotteryDay"
                  />
                </v-layout>

                <v-flex xs12>
                  <br>
                  <br>
                  <h1>
                    <v-icon large>mdi-trophy</v-icon>
                    {{ lotteryWeek.title }}
                  </h1>
                  <h3>Скоро стартует</h3>
                  <br>
                  <br>
                  <h1>
                    <v-icon large>mdi-trophy</v-icon>
                    {{ lotteryMonth.title }}
                  </h1>
                  <h3>Скоро стартует</h3>
                  <br>
                  <br>
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
        lotteryDay: {title: '«Ежедневный» розыгрыш 500 руб', url: '/lottery/day'},
        lotteryWeek: {title: '«Еженедельный» розыгрыш 5 000 руб', url: '/lottery/week'},
        lotteryMonth: {title: '«МЕГА» розыгрыш 500 000 руб', url: '/lottery/month'}
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      items () {
        return this.$store.getters.loadedLastFewItems
      },
      lotteries () {
        return this.$store.getters.loadedLotteriesSortedByDate.reverse()
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
</style>
