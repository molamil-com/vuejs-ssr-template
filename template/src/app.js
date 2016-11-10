import Vue from 'vue'
/* eslint-disable import/extensions */
import App from 'App.vue'

import router from 'router'
import store from 'store'

import VueHead from 'vue-head'
import { sync } from 'vuex-router-sync'

// Vue.use(VueHead)

// what do we gain here?!
sync(store, router)

/* eslint-disable no-new */
const vm = new Vue({
    router,
    store,
    ...App,
})

export { vm, router, store }
