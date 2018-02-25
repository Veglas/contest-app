<template>
  <v-app>

    <v-toolbar dark class="black">
      <v-toolbar-items>
        <v-btn flat :to="homeBtn.url" exact>
          <v-icon>{{ homeBtn.icon }}</v-icon>
          <v-toolbar-title>{{ homeBtn.title }}</v-toolbar-title>
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="i in menuItems" :key="i.title" :to="i.url">
          <v-icon left>{{ i.icon }}</v-icon>
          {{ i.title }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer/>

      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>

      <v-toolbar-items class="hidden-xs-only">

        <v-btn flat v-if="currentUserId === 'toxjaps6DjgDKrju6hf6Iq2e9FR2'" :to="adminBtn.url">
          <v-icon left>{{ adminBtn.icon }}</v-icon>
          {{ adminBtn.title }}
        </v-btn>

        <v-btn flat v-if="userIsAuthenticated" :to="profileBtn.url">
          <v-icon left>{{ profileBtn.icon }}</v-icon>
          {{ profileBtn.title }}
        </v-btn>

        <v-btn flat v-if="!userIsAuthenticated" v-for="i in menuUserNotAuthenticatedItems" :key="i.title" :to="i.url">
          <v-icon left>{{ i.icon }}</v-icon>
          {{ i.title }}
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-card flat tile dark class="grey darken-4">
      <v-card-text>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
                  <span>&copy; {{ new Date().getFullYear() }} Все права защищены | 18+ | Веглас Casino Streams</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-navigation-drawer fixed temporary right v-model="sideNav">
      <v-list dense class="pt-0">

        <v-list-tile :to="homeBtn.url">
          <v-list-tile-action>
            <v-icon>{{ homeBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ homeBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile v-for="i in menuItems" :key="i.title" :to="i.url">
          <v-list-tile-action>
            <v-icon>{{ i.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ i.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile v-if="currentUserId === 'toxjaps6DjgDKrju6hf6Iq2e9FR2'" :to="adminBtn.url">
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

        <v-list-tile v-if="!userIsAuthenticated" v-for="i in menuUserNotAuthenticatedItems" :key="i.title" :to="i.url">
          <v-list-tile-action>
            <v-icon>{{ i.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ i.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: null,
        homeBtn: {title: 'Веглас', icon: 'home', url: '/'},
        profileBtn: {title: 'Профиль', icon: 'portrait', url: '/user/profile'},
        adminBtn: {title: 'Админ', icon: 'security', url: '/admin'}
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {title: 'Конкурс', url: '/contest', icon: 'monetization_on'}
        ]
        return menuItems
      },
      menuUserNotAuthenticatedItems () {
        let menuUserNotAuthenticatedItems = [
          {title: 'Регистрация', url: '/user/register', icon: 'lock_open'},
          {title: 'Вход', url: '/user/login', icon: 'face'}
        ]
        return menuUserNotAuthenticatedItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
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
