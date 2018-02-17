<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
        <v-card>
          <v-card-text class="px-4">

            <h1>Загрузить</h1>

            <form @submit.prevent="onCreateItem">
              <v-text-field
                name="imageUrl"
                label="Ссылка на картинку"
                id="image-url"
                v-model="imageUrl"
                type="url"
                autocomplete="imageUrl"
                required></v-text-field>

              <div>
                <v-btn
                  @click="onPickFile"
                  class="ml-0">
                  <v-icon left>insert_photo</v-icon>
                  Выбрать картинку
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
                  <v-icon left>file_upload</v-icon>
                  Загрузить
                </v-btn>
              </div>
            </form>

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
        image: null
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
          date: new Date()
        }
        this.$store.dispatch('createItem', itemData)
        this.$router.push('/contest')
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

<style scoped>
</style>
