import { v4 as uuid } from 'uuid'

const R_O_I = 0.0019

const roundNum = (number) => {
  return +(Math.round(number + 'e+2') + 'e-2')
}

const calculateEWI = (principal, noOfInstallments) => {
  const calculationFactor = (1 + R_O_I) ** noOfInstallments
  return roundNum((principal * R_O_I * calculationFactor) / (calculationFactor - 1))
}

const getUUID = () => uuid()

export const prepareLoanDetails = loanDetails => ({
  ...loanDetails,
  id: getUUID(),
  state: 'PENDING',
  ewi: calculateEWI(loanDetails.amount, loanDetails.tenure),
  unpaidAmount: loanDetails.amount,
  transactions: [],
  completedInstallments: 0
})

export const repayAndUpdateLoanDetails = (loanDetails) => {
  // update installment count
  loanDetails.completedInstallments += 1
  // calculate interest paid
  const interestPaid = (loanDetails.unpaidAmount * (10 / 100)) / 52
  // calculate principal paid
  const amountPaid = loanDetails.ewi - interestPaid
  // record transaction
  loanDetails.transactions.push({
    interestPaid: roundNum(interestPaid),
    amountPaid: roundNum(amountPaid)
  })
  // calculate remaining principal to be repayed
  loanDetails.unpaidAmount = roundNum(loanDetails.unpaidAmount - amountPaid)
  return loanDetails
}
