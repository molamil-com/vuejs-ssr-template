<template>
    <div class="wishlist-view">
        <h1>{{ header }}</h1>
        <wishlist></wishlist>
    </div>
</template>

<script>
    import Wishlist from 'components/Wishlist'

    function fetchWishes(store) {
        return store.dispatch('getWishlist')
    }

    export default {
        // http://archive.forum.vuejs.org/topic/792/vue-router-components-show-as-anonymous-component-how-do-i-name-them/5
        name: 'wishlist-view',
        components: {
            Wishlist,
        },
        preFetch: fetchWishes,
        data() {
            return {
                header: 'WishlistView',
            }
        },
        meta() {
            return [
                { name: 'page-name', content: this.name },
            ]
        },
    }
</script>

<style scoped>
h1 {
    color: #00000;
}
</style>
