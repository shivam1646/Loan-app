<template>
  <v-card class="ma-6">
    <!-- Show if no loans applied -->
    <no-content
      v-if="!approvedLoans || !approvedLoans.length"
      text="No loans approved yet!"
    />
    <!-- Applied loans -->
    <v-expansion-panels v-if="approvedLoans && approvedLoans.length">
      <v-expansion-panel
        v-for="loan in approvedLoans"
        :key="loan.id"
      >
        <v-expansion-panel-header
          class="pa-2"
          expand-icon="mdi-chevron-down-circle"
        >
          <div class="d-flex align-center">
            <avatar :icon-obj="loanIconsMap[loan.type]" />
            <div class="flex-column">
              <p class="mb-0 font-weight-black">
                {{ loanIconsMap[loan.type].text }}
              </p>
              <p class="mb-0 text-primary">
                {{ `$${loan.amount}` }}
              </p>
            </div>
            <!-- Repay -->
            <v-btn
              v-if="loan.tenure !== loan.completedInstallments"
              class="mx-2 repay-button"
              :disabled="isRepayInProgress"
              @click.prevent="dispatchRepay(loan.id)"
            >
              Repay
            </v-btn>
            <v-chip
              v-else
              color="#0c365a"
              outlined
              class="mx-1"
              text-color="black"
            >
              Congrats! Loan is paid off.
            </v-chip>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- No transaction done -->
          <no-content
            v-if="!loan.transactions || !loan.transactions.length"
            text="No transactions done yet!"
          />
          <!-- Loan transactions -->
          <transactions
            v-if="!!loan.transactions && loan.transactions.length"
            :transactions="loan.transactions"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar
      v-model="snackbar"
      :timeout="1000"
    >
      Could not repay loan. Please try again later.
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NoContent from '../../../common/no-content.vue'
import Avatar from '../../../common/avatar.vue'
import loanIconsMap from '../loanToIconsMap.json'
import Transactions from './transactions.vue'

export default {
  name: 'approved-loans-list',

  components: {
    NoContent,
    Avatar,
    Transactions
  },

  data: () => ({
    snackbar: false,
    isRepayInProgress: false
  }),

  computed: {
    ...mapGetters('loan', ['approvedLoans'])
  },

  created () {
    this.loanIconsMap = loanIconsMap
  },

  methods: {
    ...mapActions('loan', ['repay']),

    async dispatchRepay (id) {
      try {
        this.isRepayInProgress = true
        await this.repay(id)
      } catch (error) {
        this.snackbar = true
      } finally {
        this.isRepayInProgress = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.repay-button {
  border-radius: 2rem;
  background-color: $brand-primary !important;
  color: white !important;
  text-align: right;
}
</style>
