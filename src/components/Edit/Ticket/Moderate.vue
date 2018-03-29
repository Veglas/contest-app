<template>
  <v-dialog
    v-model="moderateTicketDialog"
    max-width="448"
    @keydown.enter="onSaveChanges"
    @keydown.esc="moderateTicketDialog=false"
  >

    <v-tooltip
      v-if="!item.isModerated"
      top
      slot="activator"
      color="warning"
      open-delay="0"
    >
      <v-btn
        fab
        small
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
        small
        slot="activator"
        color="success"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      <span>Модерация</span>
    </v-tooltip>

    <v-card>
      <v-container>
        <v-card-title class="headline">Модерация билета</v-card-title>
        <v-card-text>
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
          <v-btn flat @click.stop="moderateTicketDialog=false">Отмена</v-btn>
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
        moderateTicketDialog: false,
        editedIsModerated: this.item.isModerated
      }
    },
    methods: {
      onSaveChanges () {
        this.moderateTicketDialog = false
        this.$store.dispatch('updateTicketModerate', {
          id: this.item.id,
          isModerated: this.editedIsModerated
        })
      }
    }
  }
</script>

<style>
</style>
