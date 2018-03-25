<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12 sm6>
                  <h1>Победители</h1>
                </v-flex>

                <v-flex xs12 sm6 class="text-sm-right">
                  <btn-create-ticket/>
                </v-flex>

                <v-flex xs12 v-if="loading">

                  <v-progress-circular
                    indeterminate
                    :size="150"
                    color="amber"
                  />

                </v-flex>

                <v-flex xs12 v-else>

                  <br>
                  <h2 class="mb-3">
                    <v-chip small color="teal darken-1 white--text">
                      <v-icon v-for="n in 3" :key="n">mdi-crown</v-icon>
                    </v-chip>
                    <span>МЕГА Победители</span>
                  </h2>
                  <v-layout wrap>
                    <list-item
                      v-for="i in items"
                      v-if="i.isModerated && i.isWinnerContest"
                      :key="i.id"
                      :i="i"
                    />
                  </v-layout>

                  <h4>Одним из них будешь ТЫ!</h4>
                  <p>Учавствуй каждый день ;)</p>

                  <br>
                  <h2 class="mb-3">
                    <v-chip small color="green darken-1 white--text">
                      <v-icon v-for="n in 2" :key="n">mdi-crown</v-icon>
                    </v-chip>
                    <span>Еженедельные победители</span>
                  </h2>
                  <v-layout wrap>
                    <list-item
                      v-for="i in items"
                      v-if="i.isModerated && i.isWinnerMonth"
                      :key="i.id"
                      :i="i"
                    />
                  </v-layout>

                  <br>
                  <h2 class="mb-3">
                    <v-chip small color="light-green darken-1 white--text">
                      <v-icon>mdi-crown</v-icon>
                    </v-chip>
                    <span>Ежедневные победители</span>
                  </h2>
                  <v-layout wrap>
                    <list-item
                      v-for="i in items"
                      v-if="i.isModerated && i.isWinnerWeek"
                      :key="i.id"
                      :i="i"
                    />
                  </v-layout>

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
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      items () {
        return this.$store.getters.loadedSortedByDateItems
      }
    }
  }
</script>

<style>
</style>
