<template>
  <v-dialog v-model="editLotteryDialog" max-width="666" @keydown.enter="onSaveChanges">

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
        <v-card-text>

          <div>
            <v-text-field
              name="name"
              id="name"
              label="Название"
              v-model="editedName"
            />
          </div>

          <div>
            <div>Обложка</div>
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
          <v-card v-if="editedImageUrl" width="150">
            <img
              :src="editedImageUrl"
              class="d-block mb-4"
              width="150"
            >
          </v-card>

          <div>
            <v-text-field
              name="rules"
              id="rules"
              label="Правила"
              v-model="editedRules"
              multi-line
            />
          </div>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.stop="editLotteryDialog=false">Отмена</v-btn>
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
        editedImageUrl: this.lottery.imageUrl,
        editedName: this.lottery.name,
        editedRules: this.lottery.rules
      }
    },
    methods: {
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
          this.editedImageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
      onSaveChanges () {
        this.editLotteryDialog = false
        this.$store.dispatch('updateLotteryData', {
          id: this.lottery.id,
          imageUrl: this.editedImageUrl,
          name: this.editedName,
          rules: this.editedRules
        })
      }
    }
  }
</script>

<style>
</style>
