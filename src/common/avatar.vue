<template>
  <v-avatar
    :color="`${iconObj.color} lighten-5`"
    class="mx-2"
  >
    <v-icon
      :color="`${iconObj.color} darken-1`"
    >
      {{ iconObj.icon }}
    </v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: 'avatar',

  props: {
    iconObj: {
      type: Object,
      default: () => ({
        color: 'teal',
        icon: 'mdi-cash'
      })
    }
  }
}
</script>
