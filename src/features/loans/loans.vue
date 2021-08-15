<template>
  <div>
    <div class="d-flex justify-space-between ma-6">
      <span class="text-h6">
        Manage Loans
      </span>
      <v-btn
        v-if="!loggedInUser.isAdmin"
        color="#0c365a"
        dark
        :to="{ name: 'loans-apply' }"
      >
        <v-icon left>
          mdi-plus-circle-outline
        </v-icon>
        Apply
      </v-btn>
    </div>
    <v-tabs class="ma-6" :value="tabIndex" @change="onTabChange">
      <v-tab
        v-for="tab in tabs"
        :key="tab.id"
      >
        {{ tab.title }}
      </v-tab>
    </v-tabs>
    <applied-loans-list v-if="listType === 'applied'" class="mt-6" />
    <approved-loans-list v-if="listType === 'approved'" class="mt-6" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppliedLoansList from './components/applied-loans-list.vue'
import ApprovedLoansList from './components/approved-loans-list.vue'

export default {
  name: 'loans',

  components: {
    AppliedLoansList,
    ApprovedLoansList
  },

  data: () => ({
    tabIndex: 0
  }),

  computed: {
    ...mapState(['loggedInUser']),

    tabs () {
      return this.loggedInUser.isAdmin
        ? [{ id: 0, title: 'Loans', value: 'applied' }]
        : [
            { id: 0, title: 'Approved Loans', value: 'approved' },
            { id: 1, title: 'Applied Loans', value: 'applied' }
          ]
    },

    listType () {
      return this.tabs[this.tabIndex].value
    }
  },

  created () {
    this.getList()
  },

  methods: {
    ...mapActions('loan', ['getList']),

    onTabChange (index) {
      this.tabIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.v-tab {
  text-transform: none;
}
</style>
