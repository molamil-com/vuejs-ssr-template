<template>
    <div class="new-wish pure-form">
        <input v-model="who" placeholder="Who?">
        <input v-model="what" placeholder="What?">
        <input v-model="why" placeholder="Why?">

        <button class="new-wish-button pure-button pure-button-primary" @click="addWish">Add wish</button>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                who: '',
                what: '',
                why: '',
            }
        },
        methods: {
            addWish() {
                const wish = { who: this.who, what: this.what, why: this.why }
                this.$store.dispatch('addWish', wish)
            },
        },
    }
  </script>


<style scoped lang="sass">
$primary-color: #162a3c;

.new-wish-button {
    float: left;
}
</style>
