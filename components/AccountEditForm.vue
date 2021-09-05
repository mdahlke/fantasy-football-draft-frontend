<template>
  <section class="account-edit-form">
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="submit"
    >
      <p v-if="error">
        {{ error }}
      </p>
      <v-container>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              id="register-name"
              v-model="name"
              :error-messages="nameErrors"
              label="Name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              id="register-email"
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
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
      <v-btn
        type="reset"
        @click="cancel"
      >
        Cancel
      </v-btn>
    </v-form>
  </section>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  email,
  required
} from 'vuelidate/lib/validators';
import {
  formStatusMixin
} from '~/plugins/form-status-mixin';

export default {
  name: 'AccountEditForm',
  mixins: [validationMixin, formStatusMixin],
  data() {
    return {
      valid: false,
      name: '',
      email: '',
      error: '',
      hasErrors: false,
      saved: false
    };
  },
  validations: {
    email: {
      email,
      required
    },
    name: {
      required
    }
  },
  computed: {
    emailErrors() {
      const errors = [];

      if (!this.email) {
        return [];
      }

      if (!this.$v.email.$dirty) {
        return errors;
      }

      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');

      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      !this.$v.name.required && errors.push('Name is required');
      return errors;
    }
  },
  created() {
    this.email = this.$auth.user.email;
    this.name = this.$auth.user.name;
  },
  methods: {
    async submit() {
      const data = {};

      // set form status
      this.formStatus = this.formStatuses.FORM_STATUS_WORKING;
      // validate form inputs
      this.$v.$touch();

      // if invalid set `hasErrors` to true and return
      if (this.$v.$invalid) {
        this.hasErrors = true;
        return;
      }

      data.email = this.email;
      data.name = this.name;

      const response = await this.$api.patch('/user', data);

      if (response.status === 200) {
        this.saved = true;
        this.formStatus = this.formStatuses.FORM_STATUS_SUCCESS;

        this.$auth.setUser(response.data);

        this.$notifier.show({ message: 'Account saved.', type: 'success' });
      } else {
        this.formStatus = this.formStatuses.FORM_STATUS_ERROR;
        this.$notifier.show({ message: 'An error occurred.', type: 'error' });
      }

      this.$router.push('/account');
    },
    cancel() {
      this.$router.push('/account');
    }
  }
};
</script>

<style scoped>

</style>
