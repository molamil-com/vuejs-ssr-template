<template>
    <div>
        <h1>BasePage</h1>
        <pre></pre>
    </div>
</template>

<script>
    export default {
        name: 'BasePage',
        data() {
            return {
            }
        },
        mounted() {
            debug('app:info')(JSON.stringify(this.$route))
        },
        methods: {
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
    .asd{
        $foo: red;
        color: $foo;
    }
</style>
