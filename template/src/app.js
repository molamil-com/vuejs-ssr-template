import Vue from 'vue'
/* eslint-disable import/extensions */
import App from 'App.vue'

import router from 'router'
import store from 'store'

import { sync } from 'vuex-router-sync'

sync(store, router)

/* eslint-disable no-new */
const vm = new Vue({
    router,
    store,
    ...App,
})

export { vm, router, store }
