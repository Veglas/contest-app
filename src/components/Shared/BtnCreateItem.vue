<template>
  <v-btn large color="success" class="mx-0" :to="createItemBtn.url">
    <v-icon left>{{ createItemBtn.icon }}</v-icon>
    {{ createItemBtn.title }}
  </v-btn>
</template>

<script>
  export default {
    data () {
      return {
        createItemBtn: {title: 'Участвовать', icon: 'mdi-upload', url: '/contest/create-item'}
      }
    }
  }
</script>

<style>
</style>
