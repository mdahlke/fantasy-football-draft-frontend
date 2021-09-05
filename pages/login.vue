<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Login
        </v-card-title>
      </v-card>

      <div v-if="showAuthApiError">
        <p>{{ authApiError }}</p>
      </div>

      <template v-else>
        <LoginForm />

        <div class="helper-links">
          <nuxt-link to="/forgot-password">
            Forgot Password
          </nuxt-link>
          <nuxt-link to="register">
            Register
          </nuxt-link>
        </div>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';
import LoginForm from '~/components/LoginForm';

export default {
  components: {
    LoginForm,
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      authApiError: 'We had trouble loading the form. Try again later.',
      showAuthApiError: false
    };
  },
  head() {
    return {
      title: 'Login'
    };
  },
  colorMode: 'light'
};
</script>

<style scoped lang="scss">
.helper-links {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
</style>
