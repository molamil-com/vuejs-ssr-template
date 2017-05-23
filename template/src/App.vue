<template>
    <div id="app">
        <img class="logo" src="~assets/images/logo.png" ref="logo">
        {{#unless_eq setup 'nothing'}}
        {{#unless_eq setup 'libs'}}
        <router-view name="menu"></router-view>
        {{/unless_eq}}
        {{/unless_eq}}
        <router-view></router-view>
        {{#unless_eq setup 'nothing'}}
        {{#unless_eq setup 'libs'}}
        <router-view name="footer"></router-view>
        {{/unless_eq}}
        {{/unless_eq}}
    </div>
</template>

<script>
    {{#unless_eq setup 'nothing'}}
    {{#unless_eq setup 'examples'}}
    import ua from 'assets/UserAgent'
    
    {{/unless_eq}}
    {{/unless_eq}}
    export default {
        name: 'app',
        data() {
            return { }
        },
        mounted() {
            {{#unless_eq setup 'nothing'}}
            {{#unless_eq setup 'examples'}}
            ua()
            {{/unless_eq}}
            {{/unless_eq}}
            debug('app:info')('App mounted!')
            debug('app:info')(`Environment: ${ENV.BUILD_ENV}`)
        },
    }
</script>

<style lang="sass">
@import 'assets/styles/app';

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
    margin:0;
    padding:0;
}
</style>
