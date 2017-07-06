<template>
    <div>
        <h1>BasePage</h1>
        <img class="logo" src="~assets/images/logo.png" ref="logo">
        <h2><small>fullPath: </small>{{this.$route.fullPath}}</h2>
        <h2><small>name: </small>{{this.$route.name}}</h2>
        <h2><small>params: </small>{{JSON.stringify(this.$route.params)}}</h2>
        <h2><small>query: </small>{{JSON.stringify(this.$route.query)}}</h2>
    </div>
</template>

<script>
    function fetchData(store) {
        const pageId = store.state.route.params.page_id || null
        return store.dispatch('GET_PAGE', pageId)
    }

    export default {
        name: 'BasePage',
        data() {
            return {
                loading: true,
            }
        },
        serverData: fetchData,
        mounted() {
            fetchData(this.$store).then(() => {
                this.loading = false
            })
        },
        methods: {
        },
    }
</script>

<style lang="scss">
</style>
