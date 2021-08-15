<template>
  <div class="flex-column pa-4 justify-center">
    <v-avatar color="teal lighten-5" class="mx-2">
      <v-icon color="teal darken-1">mdi-close-outline</v-icon>
    </v-avatar>
    <v-label >
      {{text}}
    </v-label>
  </div>
</template>

<script>
export default {
  name: 'no-content',

  props: {
    text: {
      type: String,
      default: 'No content'
    }
  }
}
</script>
