<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu>
        <template #activator="{ on, attrs }">
          <span
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <template v-if="$auth.loggedIn">
              <v-list-item class="px-2">
                <v-list-item-avatar>
                  <v-img :src="`https://www.gravatar.com/avatar/${$auth.user.gravatar}`" />
                </v-list-item-avatar>
              </v-list-item>
            </template>
            <v-icon v-else>
              mdi-account-circle
            </v-icon>
          </span>
          </span>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in navAccountItems"
            :key="`account-item-${i}`"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
          >
            <v-list-item-action>
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="$vuetify.theme.dark ? 'I can\'t see' : 'It\'s too bright'" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <ToastNotification />
  </v-app>
</template>

<script>
import ToastNotification from '~/components/ToastNotification';

export default {
  components: { ToastNotification },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      accountItems: {
        loggedIn: [
          {
            icon: 'mdi-account-circle',
            title: 'Account',
            to: '/account'
          },
          {
            icon: 'mdi-account-hard-hat',
            title: 'Admin',
            to: '/admin'
          },
          {
            icon: 'mdi-logout',
            title: 'Logout',
            to: '/logout'
          }
        ],
        loggedOut: [
          {
            icon: 'mdi-login',
            title: 'Login',
            to: '/login'
          },
          {
            icon: 'mdi-account-plus',
            title: 'Register',
            to: '/register'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Forgot Password',
            to: '/forgot-password'
          }
        ]
      },
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    };
  },
  computed: {
    navAccountItems() {
      return this.$auth.loggedIn ? this.accountItems.loggedIn : this.accountItems.loggedOut;
    }
  },
  methods: {
    included() {
      return [document.querySelector('.included')];
    }
  }
};
</script>
