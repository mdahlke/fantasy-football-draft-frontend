import Vue from 'vue';

export default function ({ $axios, $config, $auth }, inject) {
  const api = $axios.create({
    credentials: true
  });
  api.setBaseURL($config.apiUrl);

  inject('api', api);
}
