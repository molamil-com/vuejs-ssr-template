<template>
    <div class="components-page page">
        <h1>ComponentsPage</h1>
        <p>Use vue dev tools to inspect components</p>
        <div class="examples">
            <div class="example">
                <h2>Spinner</h2>
                <p>This is a default spinner.</p>
                <spinner/>
                <p>It can be customized</p>
                <spinner :size="14" :stroke="2" :colors="['currentColor']"></spinner>
                <spinner :size="30" :stroke="12" :colors="['#32ff03', '#0036ff']"></spinner>
                <spinner :size="60" :stroke="4" :speed="2.3" :colors="['#f442e8', '#ac41f4']"></spinner>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from 'components/blocks/Spinner'

    export default {
        name: 'ComponentsPage',
        data() {
            return {
            }
        },
        components: {
            Spinner,
        },
        methods: {
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
