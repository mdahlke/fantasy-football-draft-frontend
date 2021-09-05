import { makeNotificationObject } from '~/plugins/notifier';

export const state = () => ({
  items: []
});

export const mutations = {
  addNotification(state, item) {
    state.items.push(item);
  }
};

export const actions = {
  addItem({ commit }, item) {
    const itemObject = makeNotificationObject(item);
    commit('addNotification', itemObject);
  }
};
