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
            id="login-email"
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            id="login-password"
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
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import csrfCookieMixin from '~/mixins/csrf-cookie';

export default {
  name: 'LoginForm',
  mixins: [validationMixin, csrfCookieMixin],
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      error: '',
      showPassword: false
    };
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      required
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      }
      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      }

      this.password.length <= 0 &&
        errors.push('Password is required');

      return errors;
    }
  },
  methods: {
    async submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.hasErrors = true;
        return;
      }

      try {
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            email: this.email,
            password: this.password
          }
        });
      } catch (e) {
        this.$notifier.show({ message: e.response.data.message, type: 'error' });
      }
    },
    clear() {
      this.password = '';
      this.email = '';
    }
  }
};
</script>

<style scoped>

</style>
