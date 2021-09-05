import Vue from 'vue';

export default function ({ $axios, $config, $auth }, inject) {
  const api = $axios.create({});
  api.setBaseURL($config.apiUrl);

  inject('api', api);
}
