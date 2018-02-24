<template>
  <v-dialog persistent v-model="editDialogByAdmin" max-width="300">

    <v-btn fab color="warning" slot="activator">
      <v-icon>security</v-icon>
    </v-btn>

    <v-card>
      <v-card-title class="headline">Редактировать</v-card-title>
      <v-card-text>

        <v-text-field
          name="isWinnerWeek"
          id="isWinnerWeek"
          label="Победитель недели"
          v-model="editedIsWinnerWeek"
          required
        />

        <v-text-field
          name="isWinnerMonth"
          id="isWinnerMonth"
          label="Победитель месяца"
          v-model="editedIsWinnerMonth"
          required
        />

        <v-text-field
          name="isWinnerContest"
          id="isWinnerContest"
          label="Победитель конкурса"
          v-model="editedIsWinnerContest"
          required
        />

        <v-text-field
          name="isHidden"
          id="isHidden"
          label="Скрыть"
          v-model="editedIsHidden"
          required
        />

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.stop="editDialogByAdmin=false">Отмена</v-btn>
        <v-btn color="warning" @click="onSaveChanges">Сохранить</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        editDialogByAdmin: false,
        editedIsWinnerWeek: this.item.isWinnerWeek,
        editedIsWinnerMonth: this.item.isWinnerMonth,
        editedIsWinnerContest: this.item.isWinnerContest,
        editedIsHidden: this.item.isHidden
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedIsWinnerWeek.trim() === '' || this.editedIsWinnerMonth.trim() === '' || this.editedIsWinnerContest.trim() === '' || this.editedIsHidden.trim() === '') {
          return
        }
        this.editDialogByAdmin = false
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
