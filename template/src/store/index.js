/* eslint-disable import/first */
require('es6-promise').polyfill()

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
}

const mutations = {
}

const actions = {
}

const getters = {
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})

export default store
