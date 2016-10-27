<template>
    <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
        <a class="pure-menu-heading" href="/">{{ header }}</a>
        <ul class="router pure-menu-list" >
            <li class="pure-menu-item" v-for="item in menu.items">
                <router-link v-bind:to="item.to" class="pure-menu-link">{{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        // name: 'HomeMenu', (redundant(auto kebabbed)),
        props: ['menu'],
        data() {
            return { header: this.menu.header }
        },
    }
</script>

<style scoped lang="sass">
$primary-color: #162a3c;

.home-menu {
    padding: 0.5em;
    text-align: center;
    box-shadow: 0 1px 1px rgba(0,0,0, 0.10);
}

.home-menu {
    background: $primary-color;
}

.home-menu .pure-menu-heading {
    color: white;
    font-weight: 400;
    font-size: 120%;
}

.home-menu .pure-menu-selected a {
    color: white;
}

.home-menu a {
    color: #6FBEF3;
}

.home-menu li a:hover,
.home-menu li a:focus {
    background: none;
    border: none;
    color: #AECFE5;
}

@media (min-width: 48em) {

    .home-menu {
        text-align: left;
    }
    .home-menu ul {
        float: right;
    }
}
</style>
