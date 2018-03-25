<template>
  <v-dialog v-model="editLotteryDialog" max-width="330" @keydown.enter="onSaveChanges">

    <v-tooltip top slot="activator" color="warning" open-delay="0">
      <v-btn
        fab
        color="warning"
        slot="activator"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <span>Редактировать</span>
    </v-tooltip>

    <v-card>
      <v-container pa-1>

      <v-card-text pa-1>

        <v-layout align-center>
          <v-flex xs12>
            <v-text-field
              name="name"
              id="name"
              label="Название"
              v-model="editedName"
            />
          </v-flex>
        </v-layout>

        <v-layout align-center>
          <v-flex xs12>
            <v-text-field
              name="rules"
              id="rules"
              label="Правила"
              v-model="editedRules"
            />
          </v-flex>
        </v-layout>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.stop="editLotteryDialog=false">Отмена</v-btn>
        <v-btn color="warning" @click="onSaveChanges">Сохранить</v-btn>
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
        editLotteryDialog: false,
        editedName: this.lottery.name,
        editedRules: this.lottery.rules
      }
    },
    methods: {
      onSaveChanges () {
        this.editLotteryDialog = false
        this.$store.dispatch('updateLotteryData', {
          id: this.lottery.id,
          name: this.editedName,
          rules: this.editedRules
        })
      }
    }
  }
</script>

<style>
</style>
