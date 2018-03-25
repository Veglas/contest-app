<template>
  <v-btn large color="primary" class="ml-0" :to="createLotteryBtn.url">
    <v-icon left>{{ createLotteryBtn.icon }}</v-icon>
    <v-icon left>{{ createLotteryBtn.icon2 }}</v-icon>
    {{ createLotteryBtn.title }}
  </v-btn>
</template>

<script>
  export default {
    data () {
      return {
        createLotteryBtn: {title: 'Создать лотерею', icon: 'mdi-plus', icon2: 'mdi-trophy', url: '/admin/create/lottery'}
      }
    }
  }
</script>

<style>
</style>
