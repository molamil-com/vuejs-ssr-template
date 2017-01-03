<template>
    <div id="app">
        <img class="logo" src="~assets/images/logo.png" ref="logo">
        <router-view></router-view>
    </div>
</template>

<script>
    import { TweenLite } from 'gsap'

    export default {
        name: 'app',
        data() {
            return { }
        },
        mounted() {
            TweenLite.to(this.$refs.logo, 2, { y: 50 })
        },
    }
</script>

<style lang="scss">
@import 'assets/styles/app';

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $color;
    margin-top: 165px;
}

.logo {
    width: 105px;
    display: inline-block;
    vertical-align: middle;
}
</style>

