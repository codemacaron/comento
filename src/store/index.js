import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'
import join from './modules/join'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    list,
    join
  }
})
