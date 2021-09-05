<template>
  <section class="account-index">
    <h1>{{ $auth.user.name }}</h1>

    <AccountEditForm :user="$auth.user" />
  </section>
</template>

<script>
import AccountEditForm from '~/components/AccountEditForm';

export default {
  components: { AccountEditForm },
  middleware: 'auth',
  data() {
    return {
      user: {}
    };
  },
  head() {
    return {
      title: `${this.$auth.user.name} Account`
    };
  }
};
</script>

<style scoped>

</style>
