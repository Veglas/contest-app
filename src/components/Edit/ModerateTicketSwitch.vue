<template>
  <span style="display: inline-block;">
    <v-switch
      color="success"
      name="isModerated"
      id="isModerated"
      :label="`Модерация: ${editedIsModerated.toString()}`"
      v-model="editedIsModerated"
      @click="onSaveChanges"
    />
  </span>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        editedIsModerated: this.item.isModerated
      }
    },
    methods: {
      onSaveChanges () {
        this.$store.dispatch('updateTicketData', {
          id: this.item.id,
          isModerated: this.editedIsModerated
        })
      }
    }
  }
</script>

<style>
</style>
