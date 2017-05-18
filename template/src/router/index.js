import Router from 'vue-router'
import Vue from 'vue'
{{#unless_eq setup 'nothing'}}
{{#unless_eq setup 'libs'}}
import BasePage from 'components/pages/BasePage'
import TypographyPage from 'components/pages/TypographyPage'
import ComponentsPage from 'components/pages/ComponentsPage'
import Footer from 'components/blocks/Footer'
import Footer from 'components/blocks/MainMenu'
{{/unless_eq}}
{{/unless_eq}}
Vue.use(Router)

{{#unless_eq setup 'nothing'}}
{{#unless_eq setup 'libs'}}
const routes = [
    {
        path: '/',
        name: 'home',
        components: {
            footer: Footer,
            menu: MainMenu,
            default: BasePage,
        }
    },
    {
        path: '/',
        name: 'home',
        components: {
            footer: Footer,
            menu: MainMenu,
            default: BasePage,
        }
    },
]
{{/unless_eq}}
{{/unless_eq}}
{{#if_eq setup 'nothing'}}
const routes = [
]
{{/if_eq}}

export default new Router({
    mode: 'history',
    base: __dirname,
    routes,
})
