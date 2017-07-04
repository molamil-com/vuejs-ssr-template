import Vue from 'vue'
import Vuex from 'vuex'

import * as api from 'api'

Vue.use(Vuex)

{{#if_eq setup 'nothing'}}
const defaultState = {
}

/* eslint-disable no-underscore-dangle, no-undef */
const inBrowser = typeof window !== 'undefined'
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

const mutations = {
}

const actions = {
}

const getters = {
}
{{/if_eq}}

{{#unless_eq setup 'nothing'}}
const defaultState = {
    meta: {
        tags: [],
        title: 'Meta title',
    },
    page: {
        id: '',
        data: {},
    },
    site: {
        loaded: false,
        data: {},
    },
}
/* eslint-disable no-underscore-dangle, no-shadow */
const inBrowser = typeof window !== 'undefined'
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

function setMeta(state, data) {
    if (data.meta) {
        if (data.meta.tags) {
            state.meta.tags = data.meta.tags
        }
        if (data.meta.title) {
            state.meta.title = data.meta.title
            if (typeof window !== 'undefined') {
                document.title = state.meta.title
            }
        }
    }
}

const mutations = {
    SET_PAGE: (state, { data, id }) => {
        state.page.data = data
        state.page.id = id
        setMeta(state, data)
    },
    SET_SITE: (state, data) => {
        state.site.data = data
        state.site.loaded = true
        setMeta(state, data)
    },
}

const actions = {
    GET_PAGE: ({ commit, state }, pageId) => {
        // if no page id we default to frontpage.
        const id = pageId || 'frontpage'
        // only fetch page if it isn't current page.
        if (state.page.id !== id) {
            return api.fetchPage(id).then((result) => {
                commit('SET_PAGE', {
                    data: result,
                    id,
                })
            })
        }
        return Promise.resolve()
    },
    GET_SITE: ({ commit, state }) => {
        if (!state.site.loaded) {
            return api.fetchSite().then((result) => {
                commit('SET_SITE', result)
            })
        }
        return Promise.resolve()
    },
}

const getters = {
}
{{/unless_eq}}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})

export default store
