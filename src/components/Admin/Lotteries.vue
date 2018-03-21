<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>

        <v-card>
          <v-card-text>

            <v-layout wrap>

              <v-flex>
                <v-btn flat :to="adminTicketsBtn.url" class="primary ml-0" exact>
                  <v-icon left>{{ adminTicketsBtn.icon }}</v-icon>
                  <span>{{ adminTicketsBtn.title }}</span>
                </v-btn>

                <v-btn flat :to="adminLotteriesBtn.url" class="primary">
                  <v-icon left>{{ adminLotteriesBtn.icon }}</v-icon>
                  <span>{{ adminLotteriesBtn.title }}</span>
                </v-btn>
              </v-flex>

              <v-flex xs12>
                <h1>Лотереи</h1>
              </v-flex>

            </v-layout>

            <v-progress-circular
              v-if="loading"
              indeterminate
              :size="150"
              color="amber"
            />

            <v-layout wrap v-else>

              <v-flex xs12>
                <h2>Work in progress . . .</h2>
              </v-flex>

            </v-layout>

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
        adminTicketsBtn: {title: 'Билеты', icon: 'mdi-cash-multiple', url: '/admin'},
        adminLotteriesBtn: {title: 'Лотереи', icon: 'mdi-trophy', url: '/admin/lotteries'}
      }
    }
  }
</script>

<style>
</style>
