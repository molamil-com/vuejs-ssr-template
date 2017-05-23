<template>
    <div id="footer">
        <h2>Footer</h2>
        <ul>
            <template v-for="link in links">
                <li v-if="isExternalLink(link)">
                    <a :href="link.href" target="_blank">{{link.label}}</a>
                </li>
                <li v-else>
                    <router-link :to="link.href">{{link.label}}</router-link>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'Footer',
        serverData(store) {
            return store.dispatch('GET_SITE')
        },
        data() {
            return {
            }
        },
        computed: {
            data() {
                return _.get(this.$store.state.site, 'data.footer', {
                    links: [],
                })
            },
            links() {
                return this.data.links
            },
        },
        methods: {
            isExternalLink(link) {
                const re = /^http|www/g
                return re.test(link)
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
    #footer{
        background-color: grey;
    }
</style>
