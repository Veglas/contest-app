<template>
  <v-dialog v-model="moderateTicketDialog" max-width="330" @keydown.enter="onSaveChanges">

    <v-tooltip
      v-if="!item.isModerated"
      top
      slot="activator"
      color="warning"
      open-delay="0"
    >
      <v-btn
        fab
        slot="activator"
        color="warning"
      >
        <v-icon>mdi-eye-off</v-icon>
      </v-btn>
      <span >Модерация</span>
    </v-tooltip>

    <v-tooltip
      v-else
      top
      slot="activator"
      color="success"
      open-delay="0"
    >
      <v-btn
        fab
        slot="activator"
        color="success"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      <span>Модерация</span>
    </v-tooltip>

    <v-card>
      <v-container pa-1>

      <v-card-text pa-1>

        <v-layout align-center wrap>
          <v-flex xs12>
            <br>
            <v-switch
              color="success"
              name="isModerated"
              id="isModerated"
              :label="`Модерация: ${editedIsModerated.toString()}`"
              v-model="editedIsModerated"
            />
          </v-flex>
        </v-layout>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.stop="moderateTicketDialog=false">Отмена</v-btn>
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
        moderateTicketDialog: false,
        editedIsWinnerWeek: this.item.isWinnerWeek,
        editedIsWinnerMonth: this.item.isWinnerMonth,
        editedIsWinnerContest: this.item.isWinnerContest,
        editedIsModerated: this.item.isModerated
      }
    },
    methods: {
      onSaveChanges () {
        this.moderateTicketDialog = false
        this.$store.dispatch('updateTicketData', {
          id: this.item.id,
          isWinnerWeek: this.editedIsWinnerWeek,
          isWinnerMonth: this.editedIsWinnerMonth,
          isWinnerContest: this.editedIsWinnerContest,
          isModerated: this.editedIsModerated
        })
      }
    }
  }
</script>

<style>
</style>
