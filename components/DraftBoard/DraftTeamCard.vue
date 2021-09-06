<template>
  <section class="draft-card">
    <h1 :style="{color: team.primaryColor}">{{ team.name }}</h1>

    <div class="header">
      <div class="pick-number">Rd</div>
      <div class="player-team">Team</div>
      <div class="player-name">Player</div>
      <div class="player-position">Position</div>
      <div class="player-bye-week">Bye</div>
    </div>

    <DraftCardPlayer
      v-for="i in numberOfRounds"
      :key="team.id + '_' + i"
      :player="picks[(i-1)] || {}"
      :style="{
        '--team-secondary-color': team.secondaryColor
      }"
    />
  </section>
</template>

<script>
import {mapState} from 'vuex';

import '@/assets/draft-card-player.scss';

const DraftCardPlayer = () => import('@/components/DraftBoard/DraftCardPlayer');

export default {
  name: 'DraftTeamCard',
  components: {
    DraftCardPlayer
  },
  data() {
    return {
      picks: []
    };
  },
  computed: {
    ...mapState('draft', ['numberOfRounds'])
  },
  props: {
    team: {
      type: Object,
      required: true,
      default: () => {
        return {
          name: 'Default'
        };
      }
    }
  },
  created() {
    this.getPicks();
  },
  methods: {
    async getPicks() {
      try {
        const response = await fetch(this.$config.apiUrl + '/team/' + this.team.id + '/picks');
        const data = await response.json();

        this.picks = data;
      } catch (getTeamsFetchError) {
        console.log({getTeamsFetchError});
      }
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  display: flex;

  > * {
    flex: 1;
  }
}

.draft-card {
  border: 1px solid white;
  counter-reset: draft-round;

  .pick-number {
    flex-basis: 10%;
  }
}

.draft-card::v-deep .draft-card-player {
  counter-increment: draft-round;

  .pick-number::before {
    content: counter(draft-round);
  }

  &:nth-of-type(odd) {
    background: var(--team-secondary-color, #eee);
  }
}
</style>
