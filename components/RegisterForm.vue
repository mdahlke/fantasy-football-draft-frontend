<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <p v-if="error">
      {{ error }}
    </p>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            id="register-name"
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            id="register-email"
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
        </v-col>
      </v-row>
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
    <v-btn id="register-clear" @click="clear">
      clear
    </v-btn>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import csrfCookieMixin from '~/mixins/csrf-cookie';

export default {
  name: 'RegisterForm',
  mixins: [validationMixin, csrfCookieMixin],
  data() {
    return {
      valid: false,
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      showPassword: false,
      error: '',
      hasErrors: false
    };
  },
  validations: {
    name: {
      required
    },
    email: {
      email,
      required
    },
    password: {
      required
    }
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      !this.$v.name.required && errors.push('Name is required');
      return errors;
    },
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

      this.password !== this.passwordConfirm &&
        errors.push('Passwords must match');

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
        await this.$axios.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirm
        });

        await this.$auth.loginWith('laravelSanctum', {
          data: {
            email: this.email,
            password: this.password
          }
        });
      } catch (e) {
        this.hasErrors = true;
        this.error = e.response?.data?.message || 'An error has occurred. Try again later.';
      }
    },
    clear() {
      this.name = '';
      this.email = '';
      this.password = '';
      this.passwordConfirm = '';
    }
  }
};
</script>

<style scoped>
</style>
