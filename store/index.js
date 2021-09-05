export const state = () => ({
  authApiError: false
});

export const mutations = {
  setAuthApiError(state, val) {
    state.authApiError = val;
  }
};

export const actions = {
  nuxtServerInit({ dispatch, app }, context) {

  },
  async loadCsrfCookie({ commit }) {
    // Load the CSRF cookie to initiate Laravel Sanctum
    try {
      const response = await this.$axios.get('/sanctum/csrf-cookie');

      if (response.status !== 204) {
        commit('setAuthApiError', true);
      }
    } catch (e) {
      commit('setAuthApiError', true);
    }
  }
};
