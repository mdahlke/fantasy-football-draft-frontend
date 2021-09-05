export default function({ $axios, app, redirect }) {
  $axios.setBaseURL(app.$config.authUrl);

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect('/400');
    }
  });
}
