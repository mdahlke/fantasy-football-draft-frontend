<template>
  <v-form v-model="valid" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            id="register-password"
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :error-messages="passwordErrors"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            id="register-password-confirm"
            v-model="passwordConfirm"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm Password"
            hint="At least 8 characters"
            counter
            @click:append="showPassword = !showPassword"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-btn class="mr-4" type="submit">
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'ResetPasswordForm',
  mixins: [validationMixin],
  props: {
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      password: '',
      passwordConfirm: '',
      showPassword: false,
      hasErrors: false
    };
  },
  validations: {
    password: {
      required,
      minLength: 8
    }
  },
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      }

      this.password !== this.passwordConfirm &&
        errors.push('Passwords must match');

      return errors;
    }
  },
  created() {
    this.$store.dispatch('loadCsrfCookie');
  },
  methods: {
    async loadCsrfCookie() {
      try {
        const response = await this.$axios.get('/sanctum/csrf-cookie');

        if (response.status !== 204) {
          this.showAuthApiError = true;
        }
      } catch (e) {
        this.showAuthApiError = true;
      }
    },
    submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.hasErrors = true;
        return;
      }

      this.$axios
        .post('/reset-password', {
          password: this.password,
          password_confirmation: this.passwordConfirm,
          email: this.email,
          token: this.token
        })
        .then((response) => {
          this.$notifier.show({
            message: response.data.message,
            type: 'success'
          });
          this.$router.push({ path: '/login' });
        })
        .catch((e) => {
          const errors = e?.response?.data?.errors || [];
          let invalidReset = false;

          Object.entries(errors).forEach((error) => {
            error[1].forEach((message) => {
              this.$notifier.show({ message, type: 'error' });

              if (message === 'This password reset token is invalid.') {
                invalidReset = true;
              }
            });
          });

          if (invalidReset) {
            console.log('invalid reset');
            this.$router.push({ path: '/forgot-password' });
          } else {
            console.log('errors');
          }
        });
    },
    clear() {
      this.password = '';
      this.passwordConfirm = '';
    }
  }
};
</script>

<style scoped>
</style>
