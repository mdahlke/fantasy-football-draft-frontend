<template>
  <section class="draft-board">
    <h1>Draft Board</h1>

    <div class="draft-cards">

      <DraftTeamCard
        v-for="team in teams"
        :key="team.name"
        :team="team"
      />
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex';

const DraftTeamCard = () => import('@/components/DraftBoard/DraftTeamCard.vue');
export default {
  name: 'DraftBoard',
  components: {
    DraftTeamCard
  },
  computed: {
    ...mapState('draft', ['teams', 'currentRound', 'currentRoundPick', 'currentPick'])
  }
};
</script>

<style scoped lang="scss">

.draft-cards {
  display: flex;
  justify-content: center;

  &::v-deep {
    .draft-card {
      flex: 1;
      margin: 0 10px;
    }
  }
}

</style>
