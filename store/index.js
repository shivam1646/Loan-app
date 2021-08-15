import { getField, updateField } from 'vuex-map-fields'
import { compare } from 'bcryptjs'
import users from '../users.json'

export const state = () => ({
  user: {
    email: null,
    password: null
  },
  loggedInUser: null
})

export const getters = {
  getField
}

export const mutations = {
  updateField,

  setLoggedInUser (state, user) {
    state.loggedInUser = user
  }
}

export const actions = {
  async login ({ commit }, { email, password }) {
    const user = users.find(user => user.email === email)
    // invalid user
    if (!user) {
      throw new Error('could not find user')
    }
    const isPasswordValid = await compare(password, user.password)
    // invalid password
    if (!isPasswordValid) {
      throw new Error('incorrect password')
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    commit('setLoggedInUser', user)
  },

  logout ({ commit }) {
    sessionStorage.removeItem('user')
    commit('setLoggedInUser', null)
  }
}
