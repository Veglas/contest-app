<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <form @submit.prevent="onCreateLottery">
            <v-card-text>
              <h1>Создать лотерею</h1>
              <v-text-field
                name="name"
                label="Название"
                id="name"
                v-model="name"
                type="name"
                autocomplete="name"
                required
              />
              <div>Обложка*</div>
              <croppa
                v-model="croppa"
                :width="320"
                :height="200"
                :canvas-color="'#ccc'"
                :quality="3"
                initial-size="cover"
                :placeholder="'Выбрать'"
                :placeholder-font-size="16"
                :placeholder-color="'rgba(0,0,0,.54)'"
              />
              <v-text-field
                name="rules"
                label="Правила"
                id="rules"
                v-model="rules"
                type="rules"
                autocomplete="rules"
                multi-line
                required
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="ml-0"
                color="success"
                large
                :disabled="!formIsValid"
                type="submit"
              >
                <v-icon left>mdi-plus</v-icon>
                <v-icon left>mdi-trophy</v-icon>
                Создать
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        rules: '',
        imageUrl: '',
        image: null,
        croppa: {}
      }
    },
    computed: {
      formIsValid () {
        return this.name !== '' && this.rules !== '' && this.croppa.getChosenFile()
      }
    },
    methods: {
      onCreateLottery () {
        if (!this.formIsValid) {
          return
        }
        this.croppa.generateBlob((blob) => {
          var file = new File([blob], 'name.jpeg', {
            lastModifiedDate: new Date(),
            type: 'image/jpeg'
          })
          const itemData = {
            name: this.name,
            rules: this.rules,
            image: file,
            date: new Date()
          }
          this.$store.dispatch('createLottery', itemData)
          this.$router.push('/admin/lotteries')
        }, 'image/jpeg', 0.8)
      }
    }
  }
</script>

<style>
</style>
