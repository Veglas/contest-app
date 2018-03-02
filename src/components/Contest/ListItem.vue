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

          <div v-if="!i.isHidden">
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
              <span>Ожидает модерации</span>
            </v-tooltip>
          </div>

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
                  <v-icon left v-for="n in 3" :key="n">mdi-crown</v-icon>
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
                  <v-icon left v-for="n in 2" :key="n">mdi-crown</v-icon>
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
                  <v-icon left>mdi-crown</v-icon>
                  <span>{{ i.isWinnerWeek }}</span>
                </v-chip>
              </div>
              <span>Победитель недели</span>
            </v-tooltip>
          </div>

        </div>

        <v-spacer/>

        <v-tooltip
          top
          v-if="currentUserId === i.creatorId"
          color="info"
          open-delay="0"
        >
          <v-btn
            small
            fab
            slot="activator"
            color="info"
            @click="onLoadItem(i.id)"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <span>Ваш билет</span>
        </v-tooltip>

      </v-card-media>
      <v-card-text class="pa-2" style="font-size: 10px">
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
      loading () {
        return this.$store.getters.loading
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
