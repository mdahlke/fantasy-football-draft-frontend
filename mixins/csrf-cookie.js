import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['authApiError'])
  },
  created() {
    this.$store.dispatch('loadCsrfCookie');
  }
};
