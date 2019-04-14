<template>
  <v-btn large color="warning" class="ml-0" :to="winnersBtn.url">
    <v-icon left>{{ winnersBtn.icon }}</v-icon>
    {{ winnersBtn.title }}
  </v-btn>
</template>

<script>
  export default {
    data () {
      return {
        winnersBtn: { title: 'Победители', icon: 'mdi-crown', url: '/lottery/winners' }
      }
    }
  }
</script>

<style>
</style>
