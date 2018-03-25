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

            <div class="ticket__winners">

              <v-tooltip
                v-if="item.isWinnerContest"
                top
                color="teal darken-1 white--text"
                open-delay="0"
              >
                <div slot="activator">
                  <v-chip color="teal darken-1 white--text">
                    <v-icon v-for="n in 3" :key="n">mdi-crown</v-icon>
                    <span>{{ item.isWinnerContest }}</span>
                  </v-chip>
                </div>
                <span>МЕГА Победитель</span>
              </v-tooltip>

              <v-tooltip
                v-if="item.isWinnerMonth"
                top
                color="green darken-1 white--text"
                open-delay="0"
              >
                <div slot="activator">
                  <v-chip color="green darken-1 white--text">
                    <v-icon v-for="n in 2" :key="n">mdi-crown</v-icon>
                    <span>{{ item.isWinnerMonth }}</span>
                  </v-chip>
                </div>
                <span>Победитель недели</span>
              </v-tooltip>

              <v-tooltip
                v-if="item.isWinnerWeek"
                top
                color="light-green darken-1 white--text"
                open-delay="0"
              >
                <div slot="activator">
                  <v-chip color="light-green darken-1 white--text">
                    <v-icon>mdi-crown</v-icon>
                    <span>{{ item.isWinnerWeek }}</span>
                  </v-chip>
                </div>
                <span>Победитель дня</span>
              </v-tooltip>

            </div>

            <div class="ticket__edit text-xs-right" v-if="userIsCreator || userIsAdmin">

              <div v-if="!item.isModerated">
                <v-tooltip
                  top
                  color="warning white--text"
                  open-delay="0"
                >
                  <div slot="activator">
                    <v-chip
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
                      color="success white--text"
                    >
                      <v-icon>mdi-eye</v-icon>
                    </v-chip>
                  </div>
                  <span v-if="userIsCreator">Ваш билет прошел модерацию</span>
                  <span v-else>Билет прошел модерацию</span>
                </v-tooltip>
              </div>

              <moderate-ticket-dialog
                v-if="userIsAdmin"
                :item="item"
              />

              <edit-ticket-dialog
                v-if="userIsAdmin"
                :item="item"
              />

              <delete-ticket-dialog
                v-if="userIsCreator || userIsAdmin"
                :item="item"
              />

            </div>

            <div class="ticket__thumd text-xs-center">
              <img
                v-if="item.imageUrl"
                class="ticket__img-yes"
                :src="item.imageUrl"
              />
              <div v-else class="ticket__img-no">
                Похоже, у билета нет картинки<br>
                Создайте новый билет, а этот удалите
              </div>
            </div>

            <div style="font-size: 12px">
              ID билета: <b>{{ item.id }}</b>
              <br>
              ID участника: <a @click="onLoadUser(item.creatorId)"><b>{{ item.creatorId }}</b></a>
              <br>
              Время загрузки: <i>{{ item.date | date }}</i>
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
      item () {
        return this.$store.getters.loadedItem(this.id)
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
        return this.currentUserId === this.item.creatorId
      },
      userIsAdmin () {
        if (this.currentUserId === 'toxjaps6DjgDKrju6hf6Iq2e9FR2' || this.currentUserId === 'Ba1ck1rpfbUjXA6oWmdm1LreTmr1' || this.currentUserId === 'dNED1SUnJfe3ZhFiQMf9yc2mK5w2') {
          return true
        }
      }
    },
    methods: {
      onLoadUser (id) {
        this.$router.push('/user/profile/' + this.item.creatorId)
      }
    }
  }
</script>

<style>
  .ticket__winners {
    position: absolute;
    top: 0;
    left: 0;
  }
  .ticket__edit {
    position: absolute;
    top: 0;
    right: 0;
  }
  .ticket__thumd {
    background-color: gainsboro;
  }
  .ticket__img-yes {
    max-width: 100%;
    margin: 0 auto 8px;
    display: block;
  }
  .ticket__img-no {
    width: 100%;
    height: 400px;
    margin: 0 auto 8px;
    padding: 16px;
  }
</style>
