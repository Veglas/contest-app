<template>
  <v-dialog
    v-model="removeTicketDialog"
    max-width="448"
    @keydown.esc="removeTicketDialog=false"
  >

    <v-tooltip
      top
      slot="activator"
      color="error"
      open-delay="0"
    >
      <v-btn
        fab
        small
        color="error"
        slot="activator"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <span>Удалить</span>
    </v-tooltip>

    <v-card>
      <v-container>
        <v-card-title class="headline">Удалить билет</v-card-title>
        <v-card-text>
          Билет будет удален безвозвратно.<br>
          Вы уверены, что хотите удалить этот билет?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.stop="removeTicketDialog=false">Отмена</v-btn>
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
        removeTicketDialog: false
      }
    },
    methods: {
      onRemove () {
        this.removeTicketDialog = false
        this.$store.dispatch('removeTicket', {
          id: this.item.id,
          imageUrl: this.item.imageUrl
        })
        this.$router.push('/')
      }
    }
  }
</script>

<style>
</style>
