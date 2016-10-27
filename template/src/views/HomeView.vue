<template>
    <div class="home-view">
        <h1>{{ header }}</h1>
        <new-wish></new-wish>
    </div>
</template>

<script>
    import NewWish from 'components/NewWish'

    export default {
        name: 'home-view',
        components: {
            NewWish,
        },
        preFetch: false,
        data() {
            return {
                header: 'HomeView',
            }
        },
        meta() {
            return [
                { name: 'page-name', content: this.name },
            ]
        },
    }
</script>

<style scoped>
h1 {
    color: #00000;
}
</style>
