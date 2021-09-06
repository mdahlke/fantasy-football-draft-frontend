import {makeNotificationObject} from '~/plugins/notifier';

export const state = () => ({
  teams: [],
  picks: [],
  players: [],
  currentRound: 1,
  currentPick: 1,
  currentRoundPick: 1,
  numberOfRounds: 15,
});

export const mutations = {
  addNotification(state, item) {
    state.items.push(item);
  },
  setTeams(state, teams) {
    state.teams = teams;
  },
  setPlayers(state, players) {
    state.players = players;
  },
  setPicks(state, picks) {
    state.picks = picks;
  }
};

export const actions = {
  async init({dispatch, commit}) {
    dispatch('getTeams');
    dispatch('getPlayers');
    dispatch('getPicks');
  },
  async getTeams({commit}){
    try {
      const response = await fetch(this.$config.apiUrl + '/team');
      const data = await response.json();

      commit('setTeams', data);
    } catch (getTeamsFetchError) {
      console.log({getTeamsFetchError});
    }
  },
  async getPlayers({commit}){
    try {
      const response = await fetch(this.$config.apiUrl + '/draft/1/player');
      const data = await response.json();

      commit('setPlayers', data);
    } catch (getPlayersFetchError) {
      console.log({getPlayersFetchError});
    }
  },
  async getPicks({commit}){
    try {
      const response = await fetch(this.$config.apiUrl + '/draft/1/pick');
      const data = await response.json();

      commit('setPicks', data);
    } catch (getPicksFetchError) {
      console.log({getPicksFetchError});
    }
  },
  addItem({commit}, item) {
    const itemObject = makeNotificationObject(item);
    commit('addNotification', itemObject);
  },
};
