<template>
  <section class="draft-card-player">
    <div class="pick-number"></div>
    <div class="player-team">{{ player.team }}</div>
    <div class="player-name">{{ player.name }}</div>
    <div class="player-position">{{ player.position }}</div>
    <div class="player-bye-week">{{ player.byeWeek }}</div>
  </section>
</template>

<script>
// import playerMixin from '@/mixins/models/playerModel';

import '@/assets/draft-card-player.scss';

export default {
  name: 'DraftCardPlayer',
  // mixins: [playerMixin],
  props: {
    player: {
      type: Object,
      required: false
    }
  }
};
</script>

<style scoped lang="scss">
.draft-card-player {
  display: flex;

  > * {
    flex: 1;
    padding: 0 1%;
  }
}
</style>
