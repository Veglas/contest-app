<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md10 offset-md1>
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
              <div>
                <img
                  src="/static/img/logos/veglas-watermark-1300x420.png"
                  class="addon"
                  style="display: none;"
                >
                <croppa
                  v-model="croppa"
                  :width="540"
                  :height="338"
                  :quality="2"
                  :canvas-color="'#ccc'"
                  initial-size="cover"
                  :placeholder="'Выберите или перетащите картинку'"
                  :placeholder-font-size="16"
                  :placeholder-color="'rgba(0,0,0,.54)'"
                  :prevent-white-space="true"
                  :remove-button-size="40"
                  @file-type-mismatch="onFileTypeMismatch"
                  @draw="onDraw"
                  @file-choose="onFilePicked"
                />
              </div>
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
            </v-card-text>
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
        filePicked: false,
        image: null,
        croppa: {},
        imageUrl: '',
        rules: ''
      }
    },
    computed: {
      formIsValid () {
        return this.name !== '' && this.rules !== '' && this.filePicked
      }
    },
    methods: {
      onFilePicked () {
        this.filePicked = true
      },
      onFileTypeMismatch (file) {
        alert('Фаил не валидный. Пожалуйста, загрузите валидный фаил jpg/jpeg/png.')
      },
      onDraw: function (ctx) {
        ctx.save()
        ctx.globalAlpha = 0.7
        ctx.drawImage(document.querySelector('.addon'), 750, 556, 310, 100)
        ctx.restore()
      },
      onCreateLottery () {
        if (!this.croppa.hasImage()) {
          alert('No image to upload')
          return
        }
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
