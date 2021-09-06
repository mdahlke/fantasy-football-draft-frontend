<template>
  <section class="draftable-player">
    <h1 @click="$emit('pick', player)">{{ player.name }}</h1>
  </section>
</template>

<script>
export default {
  name: 'DraftablePlayer',
  props: {
    player: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

</style>
