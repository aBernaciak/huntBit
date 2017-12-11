import Vue from 'vue'
import Vuex from 'vuex'
import BFX from 'bitfinex-api-node';
import { db } from './firebase.js';

const VueFire = require('vuefire')
Vue.prototype.$bfx = BFX

Vue.use(Vuex)
Vue.use(VueFire)

export default new Vuex.Store({
  state: {
    cardsViewed: db.ref('sampledata')
  },
  modules: {
    splitter: {
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle (state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen
          } else {
            state.open = !state.open
          }
        }
      }
    }
  }
})
