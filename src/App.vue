<template>
  <v-app>

    <v-toolbar dark class="black">

      <v-toolbar-items>
        <v-btn flat to="/" exact>
          <v-icon>home</v-icon>
          <v-toolbar-title>Веглас</v-toolbar-title>
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="i in menuItems" :key="i.title" :to="i.url">
          <v-icon left>{{ i.icon }}</v-icon>
          {{ i.title }}
        </v-btn>

        <v-btn flat v-if="userIsAuthentificated" @click="onLogout">
          <v-icon left>{{ logoutBtn.icon }}</v-icon>
          {{ logoutBtn.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer dark class="grey darken-4">
      <span class="white--text">&copy; {{ new Date().getFullYear() }} Все права защищены | 18+ | Веглас Casino Streams</span>
    </v-footer>

    <v-navigation-drawer absolute temporary right v-model="sideNav">
      <v-btn flat v-for="i in menuItems" :key="i.title" :to="i.url">
        <v-icon left>{{ i.icon }}</v-icon>
        {{ i.title }}
      </v-btn>
      <v-btn flat v-if="userIsAuthentificated" @click="onLogout">
        <v-icon left>{{ logoutBtn.icon }}</v-icon>
        {{ logoutBtn.title }}
      </v-btn>
    </v-navigation-drawer>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: null,
        logoutBtn: {title: 'Выйти', icon: 'exit_to_app'}
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {title: 'Конкурс', url: '/contest', icon: 'monetization_on'},
          {title: 'Участвовать', url: '/contest/create-item', icon: 'file_upload'},
          {title: 'Профиль', url: '/user/profile', icon: 'face'},
          {title: 'Регистрация', url: '/user/register', icon: 'lock_open'},
          {title: 'Вход', url: '/user/login', icon: 'face'}
        ]
        if (this.userIsAuthentificated) {
          menuItems = [
            {title: 'Конкурс', url: '/contest', icon: 'monetization_on'},
            {title: 'Участвовать', url: '/contest/create-item', icon: 'file_upload'},
            {title: 'Профиль', url: '/user/profile', icon: 'face'}
          ]
        }
        return menuItems
      },
      userIsAuthentificated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
