import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

export const storeMock = (storeConfig, config) => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let store = new Vuex.Store(storeConfig);
  Object.assign(store, config);

  return { store, localVue };
}