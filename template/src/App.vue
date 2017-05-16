<template>
    <div id="app">
        <img class="logo" src="~assets/images/logo.png" ref="logo">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return { }
        },
        mounted() {
            debug('app:info')('App mounted!')
            debug('app:info')(`Environment: ${ENV.BUILD_ENV}`)
        },
    }
</script>

<style lang="sass">
@import 'assets/styles/app';

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
    margin-top: 165px;
}

.logo {
    width: 105px;
    display: inline-block;
    vertical-align: middle;
}
</style>
