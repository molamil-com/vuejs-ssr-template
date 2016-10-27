<template>
    <div id="app">
        <div class="header">
            <home-menu v-bind:menu="menu"></home-menu>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import HomeMenu from 'components/HomeMenu'

    export default {
        components: {
            HomeMenu,
        },
        data() {
            return {
                menu: {
                    header: 'wishlist-app',
                    items: [
                        { to: '/', title: 'home' },
                        { to: '/wishlist', title: 'wishlist' },
                    ],
                },
            }
        },
    }
</script>

<style>
html {
    height: 100%;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    line-height: 1.7em;
}

#app {
    color: #2c3e50;
    margin-top: -100px;
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
}

.logo {
    width: 100px;
    height: 100px
}
</style>
