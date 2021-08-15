import Vue from 'vue';
import Vuetify from 'vuetify';
import { shallowMount } from '@vue/test-utils'
import { storeMock } from '~/mock-utils';
import { VTextField, VBtn, VCardText, VCard, VForm } from 'vuetify/lib'
import Login from '@/src/features/login/login.vue'
import { state, getters, mutations, actions } from '../store/index'

Vue.use(Vuetify)

let login;

const getWrapper = (user = { email: null, password: null }) =>  {
  login = jest.fn()
  return shallowMount(Login, {
    ...storeMock({
      state: {
        ...state,
        user,
        loggedInUser: null
      },
      getters,
      mutations,
      actions: {
        ...actions,
        login
      }
    }),
    stubs: { VTextField, VBtn, VCardText, VCard, VForm }
  })
}


describe('login', () => {
  test('is a Vue instance', () => {
    const wrapper = getWrapper()
    expect(wrapper.vm).toBeTruthy()
  })

  test('form inputs', async () => {
    const wrapper = getWrapper()
    wrapper.findComponent(VTextField).vm.$emit('input', 'doe@gmail.com');
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(VTextField).props().value).toBe('doe@gmail.com');
  })

  test('submit button disabled', async () => {
    const wrapper = getWrapper()
    expect(wrapper.findComponent(VBtn).props().disabled).toEqual(true);
  })

  test('submit button enabled', async () => {
    const wrapper = getWrapper({
      email: 'doe@gmail.com',
      password: 'doe'
    })
    expect(wrapper.findComponent(VBtn).props().disabled).toEqual(false);
  })

  test('login function', async () => {
    const wrapper = getWrapper({
      email: 'doe@gmail.com',
      password: 'doe'
    })
    wrapper.findComponent(VBtn).vm.$emit('click', { preventDefault() {} })
    await wrapper.vm.$nextTick();
    expect(login).toHaveBeenCalled();
  })
})