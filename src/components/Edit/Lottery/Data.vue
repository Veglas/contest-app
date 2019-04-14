<template>
  <v-dialog
    v-model="editLotteryDialog"
    max-width="666"
    @keydown.enter="onSaveChanges"
    @keydown.esc="editLotteryDialog=false"
  >

    <v-tooltip top slot="activator" color="warning" open-delay="0">
      <v-btn
        fab
        small
        color="warning"
        slot="activator"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <span>Редактировать текст</span>
    </v-tooltip>

    <v-card>
      <v-container>
        <v-card-title class="headline">Редактировать текст</v-card-title>
        <v-card-text>
          <v-text-field
            name="name"
            id="name"
            label="Название"
            v-model="editedName"
          />
          <v-text-field
            name="rules"
            id="rules"
            label="Правила"
            v-model="editedRules"
            multi-line
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.stop="editLotteryDialog=false">Отмена</v-btn>
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
        const itemData = {
          id: this.lottery.id,
          name: this.editedName,
          rules: this.editedRules
        }
        this.$store.dispatch('updateLotteryData', itemData)
        this.editLotteryDialog = false
        // this.$router.push('/admin/lotteries')
      }
    }
  }
</script>

<style>
  .edit-lottery-dialog__image-url-container {
    width: 480px;
    position: relative;
  }
  .edit-lottery-dialog__image-url-container img {
    position: absolute;
    top: 0;
    right: left;
    z-index: 10;
    max-width: 100%;
    height: auto;
  }
  .btn--remoove-image-url {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
  }
  .croppa-container canvas {
    max-width: 100% !important;
    height: auto !important;
  }
</style>
