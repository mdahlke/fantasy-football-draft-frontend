<template>
  <section class="toast-notifications">
    <v-alert
      v-for="(notification, key) in notifications"
      :key="notification.message + key"
      class="toast-notification"
      :status="notification.status"
      :type="notification.type"
      :dismissible="true"
      :outlined="notification.outlined"
    >
      {{ notification.message }}
    </v-alert>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ToastNotification',
  inheritAttrs: false,
  computed: {
    ...mapState({
      notifications: state => state.notifications.items
    })
  },
  created() {
    // this.$store.subscribe((mutation, state) => {
    //   if (mutation.type === 'notifications/showNotification') {
    //     console.log({state});
    //     this.notifications = state.notifications.items;
    //     this.message = state.notifications.message
    //     this.type = state.notifications.type
    //     this.show = true
    //   }
    // })
  }
};
</script>

<style scoped lang="scss">
.toast-notifications {
  position: fixed;
  bottom: 20px;
  right: 10px;
  z-index: 9;
}
</style>
