<template>
  <v-dialog v-model="editDialogByAdmin" max-width="330">

    <v-btn
      fab
      color="error"
      slot="activator"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>

    <v-card>
      <v-container>
      <!--<v-card-title class="headline">Удаление</v-card-title>-->

      <v-card-text>
        Вы уверены, что хотите удалить этот билет?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.stop="editDialogByAdmin=false">Отмена</v-btn>
        <v-btn color="error" @click="onRemove">Удалить</v-btn>
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
        editDialogByAdmin: false,
        editedIsWinnerWeek: this.item.isWinnerWeek,
        editedIsWinnerMonth: this.item.isWinnerMonth,
        editedIsWinnerContest: this.item.isWinnerContest,
        editedIsHidden: this.item.isHidden
      }
    },
    methods: {
//      toggleIsHidden () {
//        this.editedIsHidden = !this.editedIsHidden
//        return this.editedIsHidden
//      },
      onSaveChanges () {
//        if (this.editedIsWinnerWeek.trim() === '' || this.editedIsWinnerMonth.trim() === '' || this.editedIsWinnerContest.trim() === '' || this.editedIsHidden.trim() === '') {
//          return
//        }
//        if (this.editedIsHidden === true || this.editedIsHidden === false) {
//          return
//        }
        this.editDialogByAdmin = false
        this.$store.dispatch('updateTicketData', {
          id: this.item.id,
          isWinnerWeek: this.editedIsWinnerWeek,
          isWinnerMonth: this.editedIsWinnerMonth,
          isWinnerContest: this.editedIsWinnerContest,
          isHidden: this.editedIsHidden
        })
      },
      onRemove () {
        this.$store.dispatch('removeTicketData', {
          id: this.item.id
        })
        this.$router.push('/contest')
      }
    },
    computed: {
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.item.creatorId
      },
      currentUserId () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id
      }
    }
  }
</script>
