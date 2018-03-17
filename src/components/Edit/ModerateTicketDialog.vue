<template>
  <v-dialog v-model="editTicketDialog" max-width="330" @keydown.enter="onSaveChanges">

    <v-tooltip top slot="activator" color="warning" open-delay="0">
      <v-btn
        fab
        color="warning"
        slot="activator"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      <span>Модерировать</span>
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
        editedIsModerated: this.item.isModerated
      }
    },
    methods: {
      onSaveChanges () {
        this.editTicketDialog = false
        this.$store.dispatch('updateTicketData', {
          id: this.item.id,
          isModerated: this.editedIsModerated
        })
      }
    }
  }
</script>

<style>
</style>
