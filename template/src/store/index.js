import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultState = {
}

/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const inBrowser = typeof window !== 'undefined'
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

// we could also just say s => ...
/* eslint-disable no-shadow */
const mutations = {
}

const actions = {
}

/* eslint-disable no-shadow */
const getters = {
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})

export default store
