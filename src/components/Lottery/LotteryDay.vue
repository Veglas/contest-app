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
                    {{ lotteryDay.title }}
                  </h1>
                  <!-- <h1>{{ lotteryDay.title }}</h1> -->
                  <h3>Билеты, участвующие в розыгрыше</h3>
                </v-flex>

                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  :size="40"
                  color="amber"
                />

                <v-layout wrap v-else>

                  <list-item
                    v-for="i in paginatedItems"
                    v-if="i.isModerated || currentUserId === i.creatorId || userIsAdmin"
                    :i="i"
                    :key="i.id"
                  />

                  <v-flex xs12 class="pt-4 text-xs-center">
                    <v-pagination
                      :length="totalPages"
                      v-model="currentPage"
                      :total-visible="7"
                      prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right"
                      color="success"
                    />
                  </v-flex>

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
    props: ['page'],
    data () {
      return {
        totalTickets: 0,
        perPage: 12,
        currentPage: 1,
        lotteryDay: { title: '«Ежедневный» розыгрыш 500 руб', url: '/lottery/day' }
      }
    },
    created () {
      this.currentPage = this.page ? Number(this.page) : 1
    },
    computed: {
      totalPages () {
        return Math.ceil(this.items.length / this.perPage)
      },
      loading () {
        return this.$store.getters.loading
      },
      items () {
        return this.$store.getters.loadedSortedByDateItems
      },
      paginatedItems () {
        return this.items.filter((el, index) => {
          return index > (this.currentPage - 1) * this.perPage && index <= this.currentPage * this.perPage
        })
      },
      currentUserId () {
        return this.$store.getters.currentUserId
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    },
    watch: {
      currentPage: function (newValue, oldValue) {
        if (newValue === 1) {
          this.$router.push({ name: 'LotteryDay' })
        } else {
          this.$router.push({ name: 'LotteryDayPaginated', params: { page: newValue } })
        }
      }
    }
  }
</script>

<style>
</style>
