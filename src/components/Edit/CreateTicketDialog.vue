<template>
  <v-dialog
    v-model="createTicketDialog"
    max-width="666"
    @keydown.enter="onCreateTicket"
    @keydown.esc="createTicketDialog=false"
  >

    <v-tooltip top slot="activator" color="success" open-delay="0">
      <v-btn
        color="success"
        class="mx-0"
        slot="activator"
      >
        <v-icon left>{{ createTicketBtn.icon }}</v-icon>
        {{ createTicketBtn.title }}
      </v-btn>
      <span>Создать билет</span>
    </v-tooltip>

    <v-card>
      <v-container>
        <v-card-title class="headline">Создать билет в {{ this.lottery.name }}</small></v-card-title>
        <v-card-text>
          <p>
            Для того чтобы участвовать в конкурсе, необходимо загрузить скриншот.<br>
            * Участвовать можно много раз, но один раз в день.
          </p>
          <div>
            <div>
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
                :placeholder="'Выберите или перетащите скриншот'"
                :placeholder-font-size="16"
                :placeholder-color="'rgba(0,0,0,.54)'"
                :remove-button-size="40"
                @file-type-mismatch="onFileTypeMismatch"
                @file-choose="onFilePicked"
              />
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.stop="createTicketDialog=false">Отмена</v-btn>
          <v-btn color="success" @click="onCreateTicket" :disabled="!formIsValid">Создать</v-btn>
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
        createTicketBtn: { title: 'Участвовать', icon: 'mdi-upload' },
        createTicketDialog: false,
        filePicked: false,
        image: null,
        croppa: {},
        lotteryId: '',
        isWinnerWeek: '',
        isWinnerMonth: '',
        isWinnerContest: '',
        isModerated: ''
      }
    },
    computed: {
      formIsValid () {
        return this.filePicked
      }
    },
    methods: {
      onFilePicked () {
        this.filePicked = true
      },
      onFileTypeMismatch (file) {
        alert('Фаил не валидный. Пожалуйста, загрузите валидный фаил jpg/jpeg/png.')
      },
      onCreateTicket () {
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
            image: file,
            date: new Date(),
            lotteryId: this.lottery.id,
            isWinnerWeek: this.isWinnerWeek,
            isWinnerMonth: this.isWinnerMonth,
            isWinnerContest: this.isWinnerContest,
            isModerated: this.isModerated
          }
          this.$store.dispatch('createTicket', itemData)
          this.createTicketDialog = false
          this.$router.push('/lottery/' + this.lottery.id)
        }, 'image/jpeg', 0.8)
      }
    }
  }
</script>

<style>
  .croppa-container canvas {
    max-width: 100% !important;
    height: auto !important;
  }
</style>
