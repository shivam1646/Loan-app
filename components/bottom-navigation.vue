<template>
  <v-bottom-navigation
    app
    grow
    :value="true"
  >
    <v-btn
      class="bottom-navigate__button"
      v-for="(item, i) in menuItems"
      :key="i"
      :to="{ path: `${item.to}` }"
    >
      {{ item.title }}
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
    <v-btn
      @click="dispatchLogout"
    >
      Logout
      <v-icon>mdi-logout-variant</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'bottom-navigation',

  props: {
    menuItems: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    ...mapActions(['logout']),

    dispatchLogout () {
      this.logout()
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
a, .v-btn {
  background-color: initial !important;
}
.v-bottom-navigation {
  align-items: center;
}
</style>
