import Vue from 'vue'
import Vuex from 'vuex'

import * as _ from 'lodash'

import api from 'api/wishlist'
import * as types from 'store/mutation-types'

Vue.use(Vuex)

const defaultState = {
    wishes: [],
}

const inBrowser = typeof window !== 'undefined'

/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

// we could also just say s => ...
/* eslint-disable no-shadow */
const mutations = {
    [types.UPDATE_WISHLIST](state, { wishes }) {
        const currentWishes = _.differenceWith(state.wishes, wishes, wish => wish.id)
        state.wishes = wishes.concat(currentWishes)
    },
    [types.ADD_WISH](state, { wish }) {
        state.wishes.push(wish)
    },
}

const actions = {
    getWishlist: async ({ commit }) => {
        const wishes = await api.getWishes()
        commit(types.UPDATE_WISHLIST, { wishes })
    },
    addWish({ commit }, wish) {
        commit(types.ADD_WISH, { wish })
    },
}

/* eslint-disable no-shadow */
const getters = {
    wishlist: state => state.wishes,
    starred: state => state.wishes.filter(wish => wish.starred),
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})

export default store
