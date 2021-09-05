<template>
  <section class="admin-index">
    <h1>Admin Index</h1>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  created() {
    console.log('admin index');
  }
};
</script>

<style scoped>

</style>
