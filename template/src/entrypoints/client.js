import 'es6-promise/auto'
import { vm, store } from 'app'

store.replaceState(window.__INITIAL_STATE__)
vm.$mount('#app')
