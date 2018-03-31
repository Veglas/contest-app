<template>
  <v-dialog
    v-model="dialogIsOpened"
    max-width="545"
    @keydown.enter="onSaveChanges"
    @keydown.esc="dialogIsOpened=false"
  >

    <v-tooltip top slot="activator" color="error" open-delay="0">
      <v-btn
        fab
        small
        color="error"
        slot="activator"
      >
        <v-icon>mdi-image</v-icon>
      </v-btn>
      <span>Заменить скриншот</span>
    </v-tooltip>

    <v-card>
      <v-container>
        <v-card-title class="headline">Заменить скриншот</v-card-title>
        <v-card-text>
          <div class="edit-item-dialog__image-url-container">
            <div v-if="imageUrlIsVisible">
              <img :src="editedImageUrl">
              <v-btn
                small
                fab
                class="error btn--remoove-image-url"
                @click="onRemoveImageUrl"
              >
                <v-icon large>mdi-close</v-icon>
              </v-btn>
            </div>
            <!-- <img
              src="/static/img/logos/veglas-watermark-1300x420.png"
              class="addon"
              style="display: none;"
            > -->
            <croppa
              v-model="croppa"
              :width="540"
              :height="338"
              :quality="2"
              :accept="'image/*'"
              :canvas-color="'#ccc'"
              initial-size="contain"
              :zoom-speed="1"
              :placeholder="'Выберите или перетащите новый скриншот'"
              :placeholder-font-size="16"
              :placeholder-color="'rgba(0,0,0,.54)'"
              :remove-button-size="40"
              @file-type-mismatch="onFileTypeMismatch"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.stop="dialogIsOpened=false">Отмена</v-btn>
          <v-btn color="warning" @click="onSaveChanges">Сохранить</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        imageUrlIsVisible: true,
        dialogIsOpened: false,
        image: null,
        croppa: {},
        editedImageUrl: this.item.imageUrl
      }
    },
    methods: {
      onRemoveImageUrl () {
        this.imageUrlIsVisible = false
      },
      onFileTypeMismatch (file) {
        alert('Фаил не валидный. Пожалуйста, загрузите валидный фаил jpg/jpeg/png.')
      },
      // onDraw: function (ctx) {
      //   ctx.save()
      //   ctx.globalAlpha = 0.7
      //   ctx.drawImage(document.querySelector('.addon'), 750, 556, 310, 100)
      //   ctx.restore()
      // },
      onSaveChanges () {
        if (!this.croppa.hasImage()) {
          alert('No image.')
          this.imageUrlIsVisible = true
          return
        } else {
          this.croppa.generateBlob((blob) => {
            var file = new File([blob], 'name.jpeg', {
              lastModifiedDate: new Date(),
              type: 'image/jpeg'
            })
            const itemData = {
              id: this.item.id,
              name: this.editedName,
              rules: this.editedRules,
              imageUrl: this.editedImageUrl,
              image: file,
              date: new Date()
            }
            this.$store.dispatch('updateTicketImage', itemData)
          }, 'image/jpeg', 0.8)
        }
        this.dialogIsOpened = false
        // this.$router.push('/admin/lotteries')
      }
    }
  }
</script>

<style>
  .edit-item-dialog__image-url-container {
    width: 100%;
    max-width: 480px;
    position: relative;
  }
  .edit-item-dialog__image-url-container img {
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
