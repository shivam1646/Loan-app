<template>
  <v-app>
    <v-app-bar dark app class="aspire-app__bar" height="100rem">
      <div class="d-flex justify-space-between flex-wrap heading-content">
        <img
          class="aspire-logo"
          alt="aspire Logo"
          src="/aspire-green.svg"
        >
        <v-toolbar-title >{{ LOGIN_TEXT }}</v-toolbar-title>
        <v-toolbar-title class="text-weight-black text-h6">Login</v-toolbar-title>
      </div>
    </v-app-bar>
    <v-navigation-drawer :value="true" app>
      <v-list dense dark>
        <!-- Brand image -->
        <v-list-item>
          <img
            class="aspire-logo"
            alt="aspire Logo"
            src="/aspire-green.svg"
          >
        </v-list-item>
      </v-list>
      <v-list three-line dense dark class="pt-0">
        <v-list-item>
          <v-list-item-content class="align-start pt-0">
            <v-list-item-title
              class="login-content__sidebar text-h6"
            >
              Login to Aspire
            </v-list-item-title>
            <v-list-item-subtitle v-text="LOGIN_TEXT" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Main content -->
    <v-main class="header-padding">
      <v-container
        class="flex-column flex-nowrap fill-height align-stretch pb-0"
        fluid
      >
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const BRAND_NAME = 'aspire'
const LOGIN_TEXT = 'Please enter the required crendentials to continue'

export default {
  created () {
    this.BRAND_NAME = BRAND_NAME
    this.LOGIN_TEXT = LOGIN_TEXT
  }
}
</script>

<style lang="scss" scoped>
.login-content__sidebar {
  line-height: 1.8rem !important;
}
</style>
