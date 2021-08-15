<template>
  <v-app>
    <v-app-bar dark app class="aspire-app__bar" height="100rem">
      <img
        class="aspire-logo"
        alt="aspire Logo"
        src="/aspire-green.svg"
      >
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
      <!-- Brand motto -->
      <v-list three-line dense dark class="pt-0">
        <v-list-item>
          <v-list-item-content class="align-start pt-0">
            <v-list-item-subtitle v-text="BRAND_MOTTO" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- Menu items -->
      <v-list dark>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-body-2" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <!-- Logout -->
        <v-list-item @click.prevent="dispatchLogout">
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-body-2" v-text="`Logout`" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Main content -->
    <v-main>
      <v-container
        class="flex-column flex-nowrap fill-height align-stretch pb-0"
        fluid
      >
        <Nuxt />
      </v-container>
    </v-main>
    <bottom-navigation class="aspire-bottom__navigation" :menuItems="menuItems" />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import bottomNavigation from '~/components/bottom-navigation.vue'

const BRAND_NAME = 'aspire'
const BRAND_MOTTO = 'Trusted way of banking for 3000+ SMEs and startups in Singapore'

export default {
  components: { bottomNavigation },
  data () {
    return {
      menuItems: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-bank',
          title: 'Loans',
          to: '/loans'
        }
      ],
      fixed: false
    }
  },

  created () {
    this.BRAND_NAME = BRAND_NAME
    this.BRAND_MOTTO = BRAND_MOTTO
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
img {
  display: block;
  margin: auto;
}
</style>
