import Router from 'vue-router'
import Vue from 'vue'

import HomeView from 'views/HomeView'
import WishlistView from 'views/WishlistView'

Vue.use(Router)

const routes = [
    { path: '/', component: HomeView },
    { path: '/wishlist', component: WishlistView },
    // { path: '*', redirect: '/' } // redirect to client-side 404
]

export default new Router({
    mode: 'history',
    base: __dirname,
    routes,
})
