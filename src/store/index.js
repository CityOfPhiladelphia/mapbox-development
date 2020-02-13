import Vue from 'vue'
import Vuex from 'vuex'
import mergeDeep from '../util/merge-deep'
import pvmStore from '@phila/vue-mapping/src/store.js'

Vue.use(Vuex)

function createStore(config) {

  const initialState = {
    candidates: [],
    addressEntered: null,
    fullScreen: {},
    fullScreenTopicsEnabled: true,
  };

  const mb = {
    state: initialState,
    mutations: {
      setCandidates(state, payload) {
        state.candidates = payload;
      },
      setAddressEntered(state, payload) {
        state.addressEntered = payload;
      },
    }
  }

  // let mergeStore = mb;
  let mergeStore = mergeDeep(mb, pvmStore);

  // TODO standardize how payloads are passed around/handled
  return new Vuex.Store({
    state: mergeStore.state,
    getters: mergeStore.getters,
    mutations: mergeStore.mutations
  });
}

export default createStore;
