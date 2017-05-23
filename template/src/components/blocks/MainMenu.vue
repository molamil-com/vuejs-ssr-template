<template>
    <div id="mainmenu">
        <h1>MainMenu</h1>
        <span v-for="link in links">
            <router-link :to="link.href">{{link.label}}</router-link>
        </span>
    </div>
</template>

<script>
    import _ from 'lodash'
    
    export default {
        name: 'MainMenu',
        serverData(store) {
            return store.dispatch('GET_SITE')
        },
        data() {
            return {
            }
        },
        computed: {
            data() {
                return _.get(this.$store.state.site, 'data.menu', {
                    links: [],
                })
            },
            links() {
                return this.data.links
            },
        },
        methods: {
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
    span{
        margin-right: 5px;
        a{
            color: white;
            &.router-link-active{
                color: yellow;
            }
            &.router-link-exact-active{
                color: red;
            }
        }
    }
    #mainmenu {
        background-color: black;
        color: white;
        padding: 5px;
        margin-bottom: 20px;
    }
</style>
