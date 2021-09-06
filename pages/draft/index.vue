<template>
  <section>
    <DraftBoard />
  </section>
</template>

<script>
import {mapState} from 'vuex';

const DraftBoard = () => import('@/components/DraftBoard/DraftBoard.vue');

export default {
  name: 'Draft',
  components: {
    DraftBoard
  },
  computed: {
    ...mapState('draft', ['teams', 'currentRound', 'currentRoundPick', 'currentPick'])
  },
  created() {
    this.$store.dispatch('draft/init');
  }
};
</script>

<style scoped>

</style>
