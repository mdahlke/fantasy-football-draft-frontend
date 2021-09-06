<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Rektum Fantasy Football
        </v-card-title>
        <v-card-text>
          <p>Welcome to the 2022 Rektum Fantasy Football Draft.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/draft"
          >
            Begin!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  head() {
    return {
      title: 'Home'
    };
  }
};
</script>
