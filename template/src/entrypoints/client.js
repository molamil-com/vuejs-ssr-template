import 'es6-promise/auto'
{{#if_eq template 'basic'}}
import { vm } from 'app'

{{/if_eq}}
{{#if_eq template 'ssr'}}
import { vm, store } from 'app'

/* eslint-disable no-underscore-dangle */
store.replaceState(window.__INITIAL_STATE__)
{{/if_eq}}
vm.$mount('#app')
