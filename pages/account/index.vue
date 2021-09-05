<template>
  <section class="account-edit">
    <h1>{{ $auth.user.name }}</h1>
    <NuxtLink to="/account/edit">
      Update Account
    </NuxtLink>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  head() {
    return {
      title: `${this.$auth.user.name} Account`
    };
  }
};
</script>

<style scoped>

</style>
