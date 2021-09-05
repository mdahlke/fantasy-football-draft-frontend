export default ({ app, store }, inject) => {
  inject('notifier', {
    show({ message = '', type = '' }) {
      store.dispatch('notifications/addItem', { message, type });
    }
  });
};

const notificationTemplate = {
  message: '',
  type: '',
  dismissible: true,
  outlined: true
};

export function makeNotificationObject(item) {
  return { ...notificationTemplate, ...item };
}
