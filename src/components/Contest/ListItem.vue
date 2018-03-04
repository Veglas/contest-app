<template>
  <v-flex xs12 sm6 md3>
    <v-card class="mb-3">
      <v-card-media
        height="200"
        style="cursor: pointer"
        @click="onLoadItem(i.id)"
        v-ripple
        :src="i.imageUrl"
      >

        <div class="winners-group">

          <div v-if="i.isWinnerContest">
            <v-tooltip
              top
              color="teal darken-1 white--text"
              open-delay="0"
            >
              <div slot="activator">
                <v-chip
                  small
                  color="teal darken-1 white--text"
                  @click="onLoadItem(i.id)"
                  style="cursor: pointer"
                >
                  <v-icon v-for="n in 3" :key="n">mdi-crown</v-icon>
                  <span>{{ i.isWinnerContest }}</span>
                </v-chip>
              </div>
              <span>Победитель розыгрыша</span>
            </v-tooltip>
          </div>

          <div v-if="i.isWinnerMonth">
            <v-tooltip
              top
              color="green darken-1 white--text"
              open-delay="0"
            >
              <div slot="activator">
                <v-chip
                  small
                  color="green darken-1 white--text"
                  @click="onLoadItem(i.id)"
                  style="cursor: pointer"
                >
                  <v-icon v-for="n in 2" :key="n">mdi-crown</v-icon>
                  <span>{{ i.isWinnerMonth }}</span>
                </v-chip>
              </div>
              <span>Победитель месяца</span>
            </v-tooltip>
          </div>

          <div v-if="i.isWinnerWeek">
            <v-tooltip
              top
              color="light-green darken-1 white--text"
              open-delay="0"
            >
              <div slot="activator">
                <v-chip
                  small
                  color="light-green darken-1 white--text"
                  @click="onLoadItem(i.id)"
                  style="cursor: pointer"
                >
                  <v-icon>mdi-crown</v-icon>
                  <span>{{ i.isWinnerWeek }}</span>
                </v-chip>
              </div>
              <span>Победитель недели</span>
            </v-tooltip>
          </div>

        </div>

        <v-spacer/>

        <div class="status-group" v-if="userIsCreator || userIsAdmin">

          <div v-if="!i.isModerated">
            <v-tooltip
              top
              color="warning white--text"
              open-delay="0"
            >
              <div slot="activator">
                <v-chip
                  small
                  slot="activator"
                  color="warning white--text"
                >
                  <v-icon>mdi-eye-off</v-icon>
                </v-chip>
              </div>
              <span v-if="userIsCreator">Ваш билет ожидает модерации</span>
              <span v-else>Билет ожидает модерации</span>
            </v-tooltip>
          </div>

          <div v-else>
            <v-tooltip
              top
              color="success white--text"
              open-delay="0"
            >
              <div slot="activator">
                <v-chip
                  small
                  slot="activator"
                  color="success white--text"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-chip>
              </div>
              <span v-if="userIsCreator">Ваш билет прошел модерацию</span>
              <span v-else>Билет прошел модерацию</span>
            </v-tooltip>
          </div>

          <!--<div v-if="userIsCreator">-->
            <!--<v-tooltip-->
              <!--top-->
              <!--color="info"-->
              <!--open-delay="0"-->
            <!--&gt;-->
              <!--<v-btn-->
                <!--small-->
                <!--fab-->
                <!--slot="activator"-->
                <!--color="info"-->
                <!--@click="onLoadItem(i.id)"-->
              <!--&gt;-->
                <!--<v-icon>mdi-account</v-icon>-->
              <!--</v-btn>-->
              <!--<span>Ваш билет</span>-->
            <!--</v-tooltip>-->
          <!--</div>-->
        </div>

      </v-card-media>
      <v-card-text class="pa-2" style="font-size: 12px">
        <b>{{ i.id }}</b>
        <br>
        <i>{{ i.date | date }}</i>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    props: ['i'],
    data () {
      return {
        id: this.i.id
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
      },
      userIsCreator () {
        return this.currentUserId === this.i.creatorId
      },
      userIsAdmin () {
        if (this.currentUserId === 'toxjaps6DjgDKrju6hf6Iq2e9FR2' || this.currentUserId === 'Ba1ck1rpfbUjXA6oWmdm1LreTmr1') {
          return true
        }
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
