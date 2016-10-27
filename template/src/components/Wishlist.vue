<template>
    <div class="wishlist">
        <ul class="wishlist">
            <li class="wishlist-item" v-for="wish in wishlist">
                {{ wish.who }}
                {{ wish.what }}
                {{ wish.why }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        computed: {
            wishlist() {
                return this.$store.getters.wishlist
            },
        },
        // lifecycle hooks
        created() {
            this.$store.dispatch('getWishlist')
        },
    }
</script>

<style scoped lang="sass">
$primary-color: #162a3c;

.wishlist {
    list-style: none;
}

.wishlist-item {
    text-align: left;
}
</style>
