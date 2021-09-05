<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline"> Register </v-card-title>
      </v-card>

      <RegisterForm />
    </v-col>
  </v-row>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import RegisterForm from "~/components/RegisterForm";

export default {
  components: {
    RegisterForm,
    Logo,
    VuetifyLogo,
  },
  head() {
    return {
      title: "Register",
    };
  },
};
</script>
