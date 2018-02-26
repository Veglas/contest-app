<template>
  <v-dialog v-model="editDialogByAdmin" max-width="330">

    <!--<v-btn-->
      <!--fab-->
      <!--color="info"-->
      <!--slot="activator"-->
    <!--&gt;-->
      <!--<v-icon>mdi-security</v-icon>-->
    <!--</v-btn>-->

    <v-tooltip top slot="activator" color="warning" open-delay="0">
      <v-btn
        fab
        color="warning"
        slot="activator"
      >
        <v-icon>mdi-security</v-icon>
      </v-btn>
      <span>Победитель</span>
    </v-tooltip>

    <v-card>
      <v-container>
      <!--<v-card-title class="headline">Редактировать</v-card-title>-->
      <v-card-text v-if="currentUserId === 'toxjaps6DjgDKrju6hf6Iq2e9FR2'">

        <v-layout align-center row>
          <v-flex xs1 mr-2>
            <v-icon color="light-green darken-1">mdi-crown</v-icon>
          </v-flex>
          <v-flex xs11>
            <v-text-field
              color="light-green darken-1"
              name="isWinnerWeek"
              id="isWinnerWeek"
              label="Победитель недели"
              v-model="editedIsWinnerWeek"
            />
          </v-flex>
        </v-layout>

        <v-layout align-center row>
          <v-flex xs1 mr-2>
            <v-icon color="green darken-1">mdi-crown</v-icon>
          </v-flex>
          <v-flex xs11>
            <v-text-field
              color="green darken-1"
              name="isWinnerMonth"
              id="isWinnerMonth"
              label="Победитель месяца"
              v-model="editedIsWinnerMonth"
            />
          </v-flex>
        </v-layout>

        <v-layout align-center row>
          <v-flex xs1 mr-2>
            <v-icon color="teal darken-1">mdi-crown</v-icon>
          </v-flex>
          <v-flex xs11>
            <v-text-field
              color="teal darken-1"
              name="isWinnerContest"
              id="isWinnerContest"
              label="Победитель конкурса"
              v-model="editedIsWinnerContest"
            />
          </v-flex>
        </v-layout>

        <!--<v-layout align-center wrap>-->
          <!--<v-flex xs12>-->
            <!--<v-switch-->
              <!--color="red darken-1"-->
              <!--name="isHidden"-->
              <!--id="isHidden"-->
              <!--:label="`Cкрыть: ${editedIsHidden.toString()}`"-->
              <!--v-model="editedIsHidden"-->
            <!--/>-->
          <!--</v-flex>-->
          <!--<v-flex xs12>-->
            <!--<v-text-field-->
              <!--name="isHidden"-->
              <!--id="isHidden"-->
              <!--label="Скрыть"-->
              <!--v-model="editedIsHidden"-->
            <!--/>-->
          <!--</v-flex>-->
        <!--</v-layout>-->

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.stop="editDialogByAdmin=false">Отмена</v-btn>
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
        editDialogByAdmin: false,
        editedIsWinnerWeek: this.item.isWinnerWeek,
        editedIsWinnerMonth: this.item.isWinnerMonth,
        editedIsWinnerContest: this.item.isWinnerContest,
        editedIsHidden: this.item.isHidden
      }
    },
    methods: {
      onSaveChanges () {
        this.editDialogByAdmin = false
        this.$store.dispatch('updateTicketData', {
          id: this.item.id,
          isWinnerWeek: this.editedIsWinnerWeek,
          isWinnerMonth: this.editedIsWinnerMonth,
          isWinnerContest: this.editedIsWinnerContest,
          isHidden: this.editedIsHidden
        })
      }
    },
    computed: {
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.item.creatorId
      },
      currentUserId () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id
      }
    }
  }
</script>
