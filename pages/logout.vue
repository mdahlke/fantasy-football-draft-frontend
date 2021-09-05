<template>
  <section />
</template>

<script>
export default {
  name: 'Logout',
  created() {
    this.$auth.logout();
  }
};
</script>

<style scoped>

</style>
