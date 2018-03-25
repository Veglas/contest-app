<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>

        <v-progress-circular
          v-if="loading"
          indeterminate
          :size="150"
          color="amber"
        />

        <v-card v-else>
          <v-card-text>

            <div class="text-xs-center">
              <!-- <img
                v-if="lottery.imageUrl"
                :src="lottery.imageUrl"
              /> -->
            </div>

            <div style="font-size: 12px">
              <b>{{ lottery.name }}</b>
              <br>
              <b>{{ lottery.rules }}</b>
            </div>
          </v-card-text>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      lottery () {
        return this.$store.getters.loadedLottery(this.id)
      }
    }
  }
</script>

<style>
</style>
