<template>
  <v-btn large color="error" class="ml-0" :to="rulesBtn.url">
    <v-icon left>{{ rulesBtn.icon }}</v-icon>
    {{ rulesBtn.title }}
  </v-btn>
</template>

<script>
  export default {
    data () {
      return {
        rulesBtn: { title: 'Правила', icon: 'mdi-file-document-box', url: '/lottery/rules' }
      }
    }
  }
</script>

<style>
</style>
