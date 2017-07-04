<template>
    <div id="app">
        {{#if_eq setup 'nothing'}}
        <img class="logo" src="~assets/images/logo.png">
        {{/if_eq}}
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

{{#if_or_eq setup 'examples' setup 'full'}}
body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
    margin:0;
    padding:0;
}
{{/if_or_eq}}
{{#if_eq setup 'nothing'}}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 165px;
}

.logo {
    width: 105px;
    display: inline-block;
    vertical-align: middle;
}
{{/if_eq}}
</style>
