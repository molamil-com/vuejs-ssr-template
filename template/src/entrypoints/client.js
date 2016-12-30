import 'es6-promise/auto'
import { vm, store } from 'app'

/* eslint-disable no-underscore-dangle */
store.replaceState(window.__INITIAL_STATE__)
vm.$mount('#app')
