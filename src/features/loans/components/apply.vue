<template>
  <div>
    <v-card class="ma-auto pa-8 loan-application__card">
      <v-card-title>New loan application</v-card-title>
      <v-card-text>
        <!-- Loan application form -->
        <v-form ref="loanForm">
          <v-label>Loan Amount($)</v-label>
          <v-slider
            v-model="amount"
            color="#01d167"
            class="align-center"
            :max="MAX_LOAN_AMOUNT"
            :min="MIN_LOAN_AMOUNT"
            hide-details
          >
            <template #append>
              <v-text-field
                v-model="amount"
                color="#01d167"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
              />
            </template>
          </v-slider>
          <v-label>Tenure(weeks)</v-label>
          <v-slider
            v-model="tenure"
            color="#01d167"
            class="align-center"
            :max="MAX_TENURE_WEEKS"
            :min="MIN_TENURE_WEEKS"
            hide-details
          >
            <template #append>
              <v-text-field
                v-model="tenure"
                color="#01d167"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
              />
            </template>
          </v-slider>
          <v-autocomplete
            v-model="type"
            class="mt-4"
            color="#01d167"
            :items="LOAN_TYPE_LIST"
            item-text="text"
            item-value="value"
            dense
            label="Loan Type"
          />
          <v-snackbar
            v-model="snackbar"
            :timeout="1000"
          >
            Something went wrong. Please try again later.
          </v-snackbar>
        </v-form>
      </v-card-text>
    </v-card>
    <!-- Actions -->
    <div class="loan-form__buttons mx-auto mt-6">
      <v-btn
        class="pa-6 cancel-button"
        :to="{ name: 'loans' }"
      >
        Cancel
      </v-btn>
      <v-btn
        class="pa-6 loan-submit__button"
        :disabled="$v.$invalid"
        @click.prevent="dispatchLoanApplication"
      >
        Apply
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, between } from 'vuelidate/lib/validators'

// constants
const MIN_LOAN_AMOUNT = 100
const MAX_LOAN_AMOUNT = 5000
const MIN_TENURE_WEEKS = 1
const MAX_TENURE_WEEKS = 10
const LOAN_TYPE_LIST = [{
  text: 'Home loan',
  value: 'home'
}, {
  text: 'Education loan',
  value: 'education'
}, {
  text: 'Personal loan',
  value: 'personal'
}, {
  text: 'Auto loan',
  value: 'auto'
}]

export default {
  name: 'apply',

  mixins: [validationMixin],

  data: () => ({
    snackbar: false
  }),

  computed: {
    ...mapFields('loan', [
      'tenure',
      'amount',
      'type'
    ])
  },

  created () {
    this.MIN_LOAN_AMOUNT = MIN_LOAN_AMOUNT
    this.MAX_LOAN_AMOUNT = MAX_LOAN_AMOUNT
    this.MIN_TENURE_WEEKS = MIN_TENURE_WEEKS
    this.MAX_TENURE_WEEKS = MAX_TENURE_WEEKS
    this.LOAN_TYPE_LIST = LOAN_TYPE_LIST
  },

  validations: {
    type: {
      required
    },
    amount: {
      between: between(MIN_LOAN_AMOUNT, MAX_LOAN_AMOUNT)
    },
    tenure: {
      between: between(MIN_TENURE_WEEKS, MAX_TENURE_WEEKS)
    }
  },

  methods: {
    ...mapActions('loan', ['submit']),

    dispatchLoanApplication () {
      try {
        this.submit({
          tenure: this.tenure,
          amount: this.amount,
          type: this.type
        })
        this.$router.push({ path: '/loans' })
      } catch (error) {
        this.snackbar = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loan-application__card, .loan-form__buttons {
  width: 60rem;
  max-width: 100%;
}
.loan-form__buttons {
  text-align: right;
}
.loan-submit__button {
  background-color: $brand-primary !important;
  color: white !important;
}
.cancel-button, .loan-submit__button {
  width: 15rem;
  border-radius: 2rem;
}
</style>
