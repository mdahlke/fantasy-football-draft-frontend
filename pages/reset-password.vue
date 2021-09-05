<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Reset Password
        </v-card-title>
      </v-card>

      <ResetPasswordForm
        :email="email"
        :token="token"
      />
    </v-col>
  </v-row>
</template>

<script>
import ResetPasswordForm from '~/components/ResetPasswordForm';

export default {
  components: {
    ResetPasswordForm
  },
  data() {
    return {
      email: '',
      token: ''
    };
  },
  head() {
    return {
      title: 'Reset Password'
    };
  },
  created() {
    this.email = this.$route.query.email;
    this.token = this.$route.query.token;
  }
};
</script>
