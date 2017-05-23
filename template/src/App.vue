<template>
    <div id="app">
        {{#if_or_eq setup 'examples' setup 'full'}}
        <router-view name="menu"></router-view>
        {{/if_or_eq}}
        <router-view></router-view>
        {{#if_or_eq setup 'examples' setup 'full'}}
        <router-view name="footer"></router-view>
        {{/if_or_eq}}
    </div>
</template>

<script>
    {{#if_or_eq setup 'examples' setup 'full'}}
    import ua from 'assets/UserAgent'

    {{/if_or_eq}}
    
    export default {
        name: 'app',
        data() {
            return { }
        },
        mounted() {
            {{#if_or_eq setup 'examples' setup 'full'}}
            ua()
            {{/if_or_eq}}
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
