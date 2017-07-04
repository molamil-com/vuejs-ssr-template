/* eslint-disable import/extensions */
import Vue from 'vue'
import App from 'App.vue'

import router from 'router'
{{#vuex}}

import store from 'store'
import { sync } from 'vuex-router-sync'

sync(store, router)
{{/vuex}}

/* eslint-disable no-new */
const vm = new Vue({
    router,
   {{#vuex}}
    store,
   {{/vuex}}
    ...App,
})

export { vm, {{#vuex}}router, {{/vuex}}store }
