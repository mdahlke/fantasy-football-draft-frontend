<template>
  <v-form
    v-model="valid"
    @submit.prevent="submit"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            id="forgot-email"
            v-model="email"
            label="E-mail"
            required
          />
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      class="mr-4"
      type="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </v-form>
</template>

<script>
import csrfCookieMixin from '~/mixins/csrf-cookie';

export default {
  name: 'ForgotPasswordForm',
  mixins: [csrfCookieMixin],
  data() {
    return {
      valid: false,
      email: ''
    };
  },
  methods: {
    async submit() {
      try {
        await this.$axios.post('/forgot-password', {
          email: this.email
        });
      } catch (e) {
        // silent fails for email verifications
      }

      this.$notifier.show({ message: 'Password reset email sent.', type: 'success' });
      this.$router.push('/login');
    },
    clear() {
      this.email = '';
    }
  }
};
</script>

<style scoped>

</style>
