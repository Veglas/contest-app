<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <v-card>
          <v-card-text>

            <h1>Участвовать</h1>

            <p>
              Для того чтобы участвовать в конкурсе, необходимо:<br>
              - Загрузить скриншот
            </p>

            <form @submit.prevent="onCreateItem">

              <div>
                <v-btn
                  @click="onPickFile"
                  class="ml-0">
                  <v-icon left>mdi-image</v-icon>
                  Выбрать
                </v-btn>
                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  accept="image/*"
                  @change="onFilePicked">
              </div>

              <div v-if="imageUrl">
                <img
                  :src="imageUrl"
                  class="d-block"
                  width="150">
              </div>

              <div>
                <v-btn
                  class="ml-0"
                  color="success"
                  large
                  :disabled="!formIsValid"
                  type="submit">
                  <v-icon left>mdi-upload</v-icon>
                  Загрузить
                </v-btn>
              </div>

            </form>

            <br>

            <p>* Участвовать можно много раз</p>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        imageUrl: '',
        image: null,
        isWinnerWeek: '',
        isWinnerMonth: '',
        isWinnerContest: '',
        isModerated: ''
      }
    },
    computed: {
      formIsValid () {
        return this.imageUrl !== ''
      }
    },
    methods: {
      onCreateItem () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const itemData = {
          image: this.image,
          date: new Date(),
          isWinnerWeek: this.isWinnerWeek,
          isWinnerMonth: this.isWinnerMonth,
          isWinnerContest: this.isWinnerContest,
          isModerated: this.isModerated
        }
        this.$store.dispatch('createItem', itemData)
        this.$router.push('/')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Фаил не валидный. Пожалуйста, загрузите валидный фаил')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>

<style>
</style>
