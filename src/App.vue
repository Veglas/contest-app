<template>
  <v-app>

    <v-toolbar dark class="black">
      <v-toolbar-items class="main-menu">
        <v-btn flat :href="veglasBtn.url" target="_blank">
          <v-icon style="color: #00b535">{{ veglasBtn.icon }}</v-icon>
          <v-toolbar-title style="color: #d89924" class="hidden-sm-and-down">{{ veglasBtn.title }}</v-toolbar-title>
        </v-btn>

        <v-btn flat :to="lotteriesBtn.url" exact>
          <v-icon>{{ lotteriesBtn.icon }}</v-icon>
          <v-toolbar-title class="hidden-xs-only">{{ lotteriesBtn.title }}</v-toolbar-title>
        </v-btn>

        <v-btn flat :to="winnersBtn.url">
          <v-icon>{{ winnersBtn.icon }}</v-icon>
          <span style="margin-left: 16px;" class="hidden-sm-and-down">{{ winnersBtn.title }}</span>
        </v-btn>

        <v-btn flat :to="rulesBtn.url">
          <v-icon>{{ rulesBtn.icon }}</v-icon>
          <span style="margin-left: 16px;" class="hidden-sm-and-down">{{ rulesBtn.title }}</span>
        </v-btn>
      </v-toolbar-items>

      <v-spacer/>

      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>

      <v-toolbar-items class="main-menu hidden-xs-only">

        <v-btn flat v-if="userIsAdmin" :to="adminBtn.url">
          <v-icon>{{ adminBtn.icon }}</v-icon>
          <span style="margin-left: 16px;" class="hidden-sm-and-down">{{ adminBtn.title }}</span>
        </v-btn>

        <v-btn flat v-if="userIsAuthenticated" :to="profileBtn.url">
          <v-icon>{{ profileBtn.icon }}</v-icon>
          <span style="margin-left: 16px;" class="hidden-sm-and-down">{{ profileBtn.title }}</span>
        </v-btn>

        <v-btn flat v-if="!userIsAuthenticated" :to="loginBtn.url">
          <v-icon>{{ loginBtn.icon }}</v-icon>
          <span style="margin-left: 16px;" class="hidden-sm-and-down">{{ loginBtn.title }}</span>
        </v-btn>

        <v-btn flat v-if="!userIsAuthenticated" :to="registerBtn.url">
          <v-icon>{{ registerBtn.icon }}</v-icon>
          <span style="margin-left: 16px;" class="hidden-sm-and-down">{{ registerBtn.title }}</span>
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-navigation-drawer
      fixed
      temporary
      right
      v-model="sideNav"
    >
      <v-list dense class="pt-0">

        <!-- <v-list-tile :href="veglasBtn.url" target="_blank">
          <v-list-tile-action>
            <v-icon>{{ veglasBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ veglasBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->

        <v-list-tile :to="lotteriesBtn.url">
          <v-list-tile-action>
            <v-icon>{{ lotteriesBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ lotteriesBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="winnersBtn.url">
          <v-list-tile-action>
            <v-icon>{{ winnersBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ winnersBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="rulesBtn.url">
          <v-list-tile-action>
            <v-icon>{{ rulesBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ rulesBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAdmin" :to="adminBtn.url">
          <v-list-tile-action>
            <v-icon>{{ adminBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ adminBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated" :to="profileBtn.url">
          <v-list-tile-action>
            <v-icon>{{ profileBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ profileBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!userIsAuthenticated" :to="loginBtn.url">
          <v-list-tile-action>
            <v-icon>{{ loginBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ loginBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!userIsAuthenticated" :to="registerBtn.url">
          <v-list-tile-action>
            <v-icon>{{ registerBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ registerBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-card flat tile dark class="grey darken-4">
      <v-card-text>
        <v-container>
          <v-layout wrap>
            <v-flex xs12>
              <div>&copy; {{ new Date().getFullYear() }} Все права защищены | 18+ | Веглас Casino Streams</div>
              <Network/>

              <!-- Yandex Metrika Informer -->
              <div>
                <img
                  src="https://informer.yandex.ru/informer/48127781/1_0_99FF99FF_99FF99FF_0_pageviews"
                  style="width:80px; height:15px; border:0;"
                  alt="яндекс.метрика"
                  title="Статистика за сегодня. Яндекс.метрика"
                />
              </div>

            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

  </v-app>
</template>

<script>
  import Network from './components/Shared/Network.vue'

  export default {
    components: {
      Network
    },
    data () {
      return {
        sideNav: null,
        veglasBtn: {title: 'Казино', icon: 'mdi-bitcoin', url: 'https://veglas.org'},
        lotteriesBtn: {title: 'Pозыгрыши', icon: 'mdi-clover', url: '/'},
        winnersBtn: {title: 'Победители', icon: 'mdi-crown', url: '/lottery/winners'},
        rulesBtn: {title: 'Правила', icon: 'mdi-file-document-box', url: '/lottery/rules'},
        profileBtn: {title: 'Профиль', icon: 'mdi-account', url: '/user/profile'},
        adminBtn: {title: 'Админ', icon: 'mdi-security', url: '/admin'},
        loginBtn: {title: 'Вход', icon: 'mdi-key', url: '/user/login'},
        registerBtn: {title: 'Регистрация', icon: 'mdi-account-plus', url: '/user/register'}
      }
    },
    computed: {
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      currentUserId () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id
      },
      userIsAdmin () {
        if (this.currentUserId === 'toxjaps6DjgDKrju6hf6Iq2e9FR2' || this.currentUserId === 'Ba1ck1rpfbUjXA6oWmdm1LreTmr1' || this.currentUserId === 'dNED1SUnJfe3ZhFiQMf9yc2mK5w2') {
          return true
        }
      }
    }
  }
</script>

<style>
  .chip__content {
    max-width: 200px;
  }
  .chip__content span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .main-menu .btn {
    min-width: 56px;
  }
  @media only screen and (max-width: 599px) {
    .main-menu.toolbar__items {
      margin-left: 8px !important;
    }
  }
</style>
