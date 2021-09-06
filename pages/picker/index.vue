<template>
  <section>
    <h1>Draft Pickers</h1>

    <DraftablePlayer
      v-for="player in draftable"
      :key="player.id"
      :player="player"
      @pick="confirmPick"
    />

<!--    <ul>-->
<!--      <li v-for="pick in picks"-->
<!--          :key="'drafted_' + pick.player.id"-->
<!--          class="disabled"-->
<!--      >{{ pick.player.name }} drafted by {{ pick.team.name }} in round {{ pick.round }}-->
<!--      </li>-->
<!--    </ul>-->

  </section>
</template>

<script>
import {mapState} from 'vuex';
import {differenceWith as _differenceWith} from 'lodash';

const DraftablePlayer = () => import('@/components/DraftPicker/DraftablePlayer.vue');

export default {
  name: 'DraftPicker',
  components: {
    DraftablePlayer
  },
  computed: {
    ...mapState('draft', ['teams', 'currentRound', 'currentRoundPick', 'currentPick', 'players', 'picks']),
    draftable() {
      return this.players.filter((a) => {
        return !this.picks.some(function (b) {
          return a.id === b.player_id; // return the ones with equal id
        });
      });
    }
  },
  created() {
    this.$store.dispatch('draft/init');
  },
  methods: {
    confirmPick(player) {
      const confirmed = window.confirm('Are you sure? ' + player.name);

      if (confirmed) {
        this.pickPlayer(player);
      }
    },
    async pickPlayer(player) {
      const response = await this.$api.post('/draft/1/pick', {
        team: 1,
        player: player.id
      });

      this.$store.commit('draft/setPicks', response.data);
    }
  }
};
</script>

<style scoped>

</style>
