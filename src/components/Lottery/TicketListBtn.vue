<template>
  <v-flex xs12 sm6 md3>
    <v-card
      tile
      height="252"
      class="light-green"
      style="display: flex; align-items: center; justify-content: center;"
      :to="url"
    >
      <v-btn
        large
        class="success"
      >
        <v-icon large left>mdi-ticket</v-icon>
        Все билеты
      </v-btn>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    props: ['btn'],
    data () {
      return {
        url: this.btn.url
      }
    }
  }
</script>

<style>
</style>
