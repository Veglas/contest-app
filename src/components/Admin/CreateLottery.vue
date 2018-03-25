<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <v-card>
          <v-card-text>

            <h1>Создать лотерею</h1>

            <form @submit.prevent="onCreateLottery">

              <div>
                <v-text-field
                  name="name"
                  label="Название"
                  id="name"
                  v-model="name"
                  type="name"
                  autocomplete="name"
                  required
                />
              </div>

              <div>
                <div>Обложка*</div>
                <v-btn
                  @click="onPickFile"
                  class="ml-0"
                >
                  <v-icon left>mdi-image</v-icon>
                  Выбрать
                </v-btn>
                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  accept="image/*"
                  @change="onFilePicked"
                >
              </div>
              <v-card v-if="imageUrl" width="150">
                <img
                  :src="imageUrl"
                  class="d-block mb-4"
                  width="150"
                >
              </v-card>

              <div>
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
              </div>

              <div>
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
        name: '',
        rules: '',
        imageUrl: '',
        image: null
      }
    },
    computed: {
      formIsValid () {
        return this.imageUrl !== '' && this.name !== '' && this.rules !== ''
      }
    },
    methods: {
      onCreateLottery () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const itemData = {
          name: this.name,
          rules: this.rules,
          image: this.image,
          date: new Date()
        }
        this.$store.dispatch('createLottery', itemData)
        this.$router.push('/admin/lotteries')
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
