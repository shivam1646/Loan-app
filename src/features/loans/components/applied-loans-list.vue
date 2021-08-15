<template>
  <v-card class="ma-6">
    <!-- Show if no loans applied -->
    <no-content
      v-if="!appliedLoans || !appliedLoans.length"
      :text="loggedInUser.isAdmin ? 'No loans to approve. Please try after some time.' : 'Start applying'"
    />
    <!-- Applied Loans -->
    <v-list v-if="appliedLoans && appliedLoans.length">
      <v-list-item
        v-for="loan in appliedLoans"
        :key="loan.id"
      >
        <avatar :icon-obj="loanIconsMap[loan.type]" />
        <v-list-item-content>
          <v-list-item-title
            class="font-weight-black"
            v-text="loanIconsMap[loan.type].text"
          />
          <v-list-item-subtitle
            class="text-primary"
            v-text="`$${loan.amount}`"
          />
        </v-list-item-content>
        <!-- Approve loan -->
        <v-list-item-action v-if="loggedInUser.isAdmin">
          <v-btn
            class="admin-approve__button"
            @click.prevent="dispatchApprove(loan.id)"
          >
            Approve
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-snackbar
      v-model="snackbar"
      :timeout="1000"
    >
      Could not approve loan. Please try again later.
    </v-snackbar>
  </v-card>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import NoContent from '../../../common/no-content.vue'
import Avatar from '../../../common/avatar.vue'
import loanIconsMap from '../loanToIconsMap.json'

export default {
  name: 'applied-loans-list',

  components: {
    NoContent,
    Avatar
  },

  data: () => ({
    snackbar: false
  }),

  computed: {
    ...mapState(['loggedInUser']),
    ...mapGetters('loan', ['appliedLoans'])
  },

  created () {
    this.loanIconsMap = loanIconsMap
  },

  methods: {
    ...mapActions('loan', ['approve']),

    async dispatchApprove (id) {
      try {
        await this.approve(id)
      } catch (error) {
        this.snackbar = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-approve__button {
  border-radius: 2rem;
  background-color: $brand-primary !important;
  color: white !important;
}
</style>
