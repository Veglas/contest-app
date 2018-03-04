<template>
  <v-dialog v-model="editTicketDialog" max-width="330" @keydown.enter="onSaveChanges">

    <v-tooltip top slot="activator" color="warning" open-delay="0">
      <v-btn
        fab
        color="warning"
        slot="activator"
      >
        <v-icon>mdi-security</v-icon>
      </v-btn>
      <span>Редактировать</span>
    </v-tooltip>

    <v-card>
      <v-container>

      <v-card-text">

        <v-layout align-center row>
          <v-flex xs1 mr-2>
            <v-icon color="light-green darken-1">mdi-crown</v-icon>
          </v-flex>
          <v-flex xs11>
            <v-text-field
              color="light-green darken-1"
              name="isWinnerWeek"
              id="isWinnerWeek"
              label="Победитель недели"
              v-model="editedIsWinnerWeek"
            />
          </v-flex>
        </v-layout>

        <v-layout align-center row>
          <v-flex xs1 mr-2>
            <v-icon color="green darken-1">mdi-crown</v-icon>
          </v-flex>
          <v-flex xs11>
            <v-text-field
              color="green darken-1"
              name="isWinnerMonth"
              id="isWinnerMonth"
              label="Победитель месяца"
              v-model="editedIsWinnerMonth"
            />
          </v-flex>
        </v-layout>

        <v-layout align-center row>
          <v-flex xs1 mr-2>
            <v-icon color="teal darken-1">mdi-crown</v-icon>
          </v-flex>
          <v-flex xs11>
            <v-text-field
              color="teal darken-1"
              name="isWinnerContest"
              id="isWinnerContest"
              label="Победитель конкурса"
              v-model="editedIsWinnerContest"
            />
          </v-flex>
        </v-layout>

        <v-layout align-center wrap>
          <v-flex xs12>
            <br>
            <v-switch
              color="success"
              name="isHidden"
              id="isHidden"
              :label="`Модерация: ${editedIsHidden.toString()}`"
              v-model="editedIsHidden"
            />
          </v-flex>
        </v-layout>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.stop="editTicketDialog=false">Отмена</v-btn>
        <v-btn color="warning" @click="onSaveChanges">Сохранить</v-btn>
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
        editedIsWinnerContest: this.item.isWinnerContest,
        editedIsHidden: this.item.isHidden
      }
    },
    methods: {
      onSaveChanges () {
        this.editTicketDialog = false
        this.$store.dispatch('updateTicketData', {
          id: this.item.id,
          isWinnerWeek: this.editedIsWinnerWeek,
          isWinnerMonth: this.editedIsWinnerMonth,
          isWinnerContest: this.editedIsWinnerContest,
          isHidden: this.editedIsHidden
        })
      }
    }
  }
</script>
