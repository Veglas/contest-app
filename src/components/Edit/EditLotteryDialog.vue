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
        color="warning"
        slot="activator"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <span>Редактировать</span>
    </v-tooltip>

    <v-card>
      <v-container>
        <v-card-title class="headline">Редактировать лотерею</v-card-title>
        <v-card-text>
            <v-text-field
              name="name"
              id="name"
              label="Название"
              v-model="editedName"
            />
            <div>Обложка</div>
            <div class="edit-lottery-dialog__image-url-container">
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
              <img
                src="/static/img/logos/veglas-watermark-1300x420.png"
                class="addon"
                style="display: none;"
              >
              <croppa
                v-model="croppa"
                :width="480"
                :height="300"
                :canvas-color="'#ccc'"
                :quality="3"
                initial-size="cover"
                :placeholder="'Выберите или перетащите картинку'"
                :placeholder-font-size="16"
                :placeholder-color="'rgba(0,0,0,.54)'"
                :prevent-white-space="true"
                :remove-button-size="40"
                @file-type-mismatch="onFileTypeMismatch"
                @draw="onDraw"
              />
            </div>
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
        imageUrlIsVisible: true,
        editLotteryDialog: false,
        editedName: this.lottery.name,
        image: null,
        croppa: {},
        editedImageUrl: this.lottery.imageUrl,
        editedRules: this.lottery.rules
      }
    },
    methods: {
      onRemoveImageUrl () {
        this.imageUrlIsVisible = false
      },
      onFileTypeMismatch (file) {
        alert('Invalid file type. Please choose a jpeg or png file.')
      },
      onDraw: function (ctx) {
        ctx.save()
        ctx.globalAlpha = 0.7
        ctx.drawImage(document.querySelector('.addon'), 1100, 760, 310, 100)
        ctx.restore()
      },
      onSaveChanges () {
        if (!this.croppa.hasImage()) {
          const itemData = {
            id: this.lottery.id,
            name: this.editedName,
            rules: this.editedRules,
            imageUrl: this.editedImageUrl,
            image: 'name.jpeg'
          }
          this.$store.dispatch('updateLotteryData', itemData)
        } else {
          this.croppa.generateBlob((blob) => {
            var file = new File([blob], 'name.jpeg', {
              lastModifiedDate: new Date(),
              type: 'image/jpeg'
            })
            const itemData = {
              id: this.lottery.id,
              name: this.editedName,
              rules: this.editedRules,
              imageUrl: this.editedImageUrl,
              image: file
              // date: new Date()
            }
            this.$store.dispatch('updateLotteryData', itemData)
          }, 'image/jpeg', 0.8)
        }
        this.editLotteryDialog = false
        this.$router.push('/admin/lotteries')
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
