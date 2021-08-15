import { getField, updateField } from 'vuex-map-fields'
import { prepareLoanDetails, repayAndUpdateLoanDetails } from '../utils'

export const state = () => ({
  tenure: 1,
  amount: 100,
  type: null,
  list: []
})

export const getters = {
  getField,

  appliedLoans: state => state.list.filter(item => item.state === 'PENDING'),

  approvedLoans: state => state.list.filter(item => item.state === 'APPROVED')
}

export const mutations = {
  updateField,

  setList (state, list) {
    state.list = list
  }
}

export const actions = {
  getList ({ commit }) {
    commit(
      'setList',
      !localStorage.getItem('loans')
        ? JSON.parse('[]')
        : JSON.parse(localStorage.getItem('loans')))
  },

  submit ({ commit }, loanDetails) {
    loanDetails = prepareLoanDetails(loanDetails)
    const list = localStorage.getItem('loans')
    try {
      localStorage.setItem('loans', list
        ? [...JSON.parse(list), loanDetails]
        : JSON.stringify([loanDetails])
      )
      commit('setList', JSON.parse(localStorage.getItem('loans')))
    } catch (error) {
      throw new Error('Something went wrong. Please try again later')
    }
  },

  async repay ({ dispatch }, loanId) {
    // get loans list
    const list = JSON.parse(localStorage.getItem('loans'))
    // get loan details by id
    const index = list.findIndex(item => item.id === loanId)
    // repay
    list[index] = repayAndUpdateLoanDetails(list[index])
    await dispatch('updateList', list)
  },

  async approve ({ dispatch }, loanId) {
    // get loans list
    const list = JSON.parse(localStorage.getItem('loans'))
    // get loan details by id
    const index = list.findIndex(item => item.id === loanId)
    // approve loan
    list[index].state = 'APPROVED'
    await dispatch('updateList', list)
  },

  updateList ({ commit }, list) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          localStorage.setItem('loans', JSON.stringify(list))
          commit('setList', list)
          resolve()
        } catch (error) {
          reject(new Error('Something went wrong. Please try again later'))
        }
      }, 1000)
    })
  }
}
