<template>
  <v-list>
    <template
      v-for="(transaction, i) in transactions"
    >
      <v-list-item :key="i">
        <div class="d-flex flex-wrap justify-space-between align-center">
          <v-avatar color="cyan lighten-5" class="mx-2">
            <v-icon color="cyan darken-1">
              mdi-cash
            </v-icon>
          </v-avatar>
          <v-chip
            color="#01d167"
            outlined
            class="mx-1"
            text-color="black"
          >
            {{ `$${transaction.interestPaid} interest paid` }}
          </v-chip>
          <v-chip
            color="#01d167"
            outlined
            class="mx-1"
            text-color="black"
          >
            {{ `$${transaction.amountPaid} amount paid` }}
          </v-chip>
        </div>
      </v-list-item>
      <v-divider
        v-if="i < transactions.length-1"
        :key="`${i}divide`"
      />
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'transactions',

  props: {
    transactions: {
      type: Array,
      default: () => []
    }
  }
}
</script>
