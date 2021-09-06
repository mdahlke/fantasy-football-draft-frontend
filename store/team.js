import {makeNotificationObject} from '~/plugins/notifier';

export const state = () => ({
  picks: []
});

export const mutations = {
  addNotification(state, item) {
    state.items.push(item);
  },
  setPicks(state, picks) {
    state.picks = picks;
  },
  addPick(state, pick) {
    state.picks.push(pick);
  }
};

export const actions = {
  addItem({commit}, item) {
    const itemObject = makeNotificationObject(item);
    commit('addNotification', itemObject);
  },
  
};
