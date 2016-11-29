<template>
    <div id="app">
        <img class="logo" src="./assets/images/logo.png">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return { }
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

