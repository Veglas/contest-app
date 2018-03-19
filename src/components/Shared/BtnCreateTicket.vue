<template>
  <v-btn large color="success" class="mx-0" :to="createTicketBtn.url">
    <v-icon left>{{ createTicketBtn.icon }}</v-icon>
    {{ createTicketBtn.title }}
  </v-btn>
</template>

<script>
  export default {
    data () {
      return {
        createTicketBtn: {title: 'Участвовать', icon: 'mdi-upload', url: '/lottery/create-ticket'}
      }
    }
  }
</script>

<style>
</style>
