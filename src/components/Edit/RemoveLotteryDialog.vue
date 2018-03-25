<template>
  <v-dialog v-model="deleteLotteryDialog" max-width="448">

    <v-tooltip
      top
      slot="activator"
      color="error"
      open-delay="0"
    >
      <v-btn
        fab
        color="error"
        slot="activator"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <span>Удалить</span>
    </v-tooltip>

    <v-card>
      <v-container>

        <v-card-title class="headline">Удалить лотерею</v-card-title>

        <v-card-text>
          Лотерея будет удалена безвозвратно.<br>
          Вы уверены, что хотите удалить эту лотерею?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.stop="deleteLotteryDialog=false">Отмена</v-btn>
          <v-btn color="error" @click="onRemove">Удалить</v-btn>
        </v-card-actions>

      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    props: ['lottery'],
    data () {
      return {
        deleteLotteryDialog: false
      }
    },
    methods: {
      onSaveChanges () {
        this.deleteLotteryDialog = false
      },
      onRemove () {
        this.$store.dispatch('removeLotteryData', {
          id: this.lottery.id,
          imageUrl: this.lottery.imageUrl
        })
        this.$router.push('/admin/lotteries')
      }
    }
  }
</script>

<style>
</style>
