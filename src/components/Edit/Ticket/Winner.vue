<template>
  <v-dialog
    v-model="editTicketDialog"
    max-width="448"
    @keydown.enter="onSaveChanges"
    @keydown.esc="editTicketDialog=false"
  >

    <v-tooltip top slot="activator" color="warning" open-delay="0">
      <v-btn
        fab
        small
        color="warning"
        slot="activator"
      >
        <v-icon>mdi-crown</v-icon>
      </v-btn>
      <span>Победитель</span>
    </v-tooltip>

    <v-card>
      <v-container>
        <v-card-title class="headline">Назначить победителем</v-card-title>
        <v-card-text>

          <v-layout align-center>
            <v-flex xs1 mr-2>
              <v-icon color="light-green darken-1">mdi-crown</v-icon>
            </v-flex>
            <v-flex xs11>
              <v-text-field
                color="light-green darken-1"
                name="isWinnerWeek"
                id="isWinnerWeek"
                label="Победитель дня"
                v-model="editedIsWinnerWeek"
              />
            </v-flex>
          </v-layout>

          <v-layout align-center>
            <v-flex xs2 mr-2>
              <v-icon color="green darken-1" v-for="n in 2" :key="n">mdi-crown</v-icon>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                color="green darken-1"
                name="isWinnerMonth"
                id="isWinnerMonth"
                label="Победитель недели"
                v-model="editedIsWinnerMonth"
              />
            </v-flex>
          </v-layout>

          <v-layout align-center>
            <v-flex xs3 mr-2>
              <v-icon color="teal darken-1" v-for="n in 3" :key="n">mdi-crown</v-icon>
            </v-flex>
            <v-flex xs9>
              <v-text-field
                color="teal darken-1"
                name="isWinnerContest"
                id="isWinnerContest"
                label="МЕГА Победитель"
                v-model="editedIsWinnerContest"
              />
            </v-flex>
          </v-layout>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.stop="editTicketDialog=false">Отмена</v-btn>
          <v-btn color="success" @click="onSaveChanges">Сохранить</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        editTicketDialog: false,
        editedIsWinnerWeek: this.item.isWinnerWeek,
        editedIsWinnerMonth: this.item.isWinnerMonth,
        editedIsWinnerContest: this.item.isWinnerContest
      }
    },
    methods: {
      onSaveChanges () {
        this.editTicketDialog = false
        this.$store.dispatch('updateTicketWinner', {
          id: this.item.id,
          isWinnerWeek: this.editedIsWinnerWeek,
          isWinnerMonth: this.editedIsWinnerMonth,
          isWinnerContest: this.editedIsWinnerContest
        })
      }
    }
  }
</script>

<style>
</style>
