<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Forgot Password
        </v-card-title>
      </v-card>

      <ForgotPasswordForm />
    </v-col>
  </v-row>
</template>

<script>
import ForgotPasswordForm from '~/components/ForgotPasswordForm';
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';

export default {
  components: {
    ForgotPasswordForm,
    Logo,
    VuetifyLogo
  },
  head() {
    return {
      title: 'Forgot Password'
    };
  }
};
</script>
