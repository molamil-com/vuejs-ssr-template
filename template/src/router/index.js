import Router from 'vue-router'
import Vue from 'vue'
{{#if_or_eq setup 'full' setup 'examples'}}
import BasePage from 'components/pages/BasePage'
import TypographyPage from 'components/pages/TypographyPage'
import ComponentsPage from 'components/pages/ComponentsPage'
import Footer from 'components/blocks/Footer'
import MainMenu from 'components/blocks/MainMenu'
{{/if_or_eq}}

Vue.use(Router)

{{#if_or_eq setup 'full' setup 'examples'}}
const routes = [
    {
        path: '/',
        name: 'home',
        components: {
            footer: Footer,
            menu: MainMenu,
            default: BasePage,
        },
    },
    {
        path: '/pages/:page_id?/:bar?',
        name: 'BasePageWithOptionalParameters',
        components: {
            footer: Footer,
            menu: MainMenu,
            default: BasePage,
        },
    },
    {
        path: '/typography',
        name: 'TypographyPage',
        components: {
            footer: Footer,
            menu: MainMenu,
            default: TypographyPage,
        },
    },
    {
        path: '/components',
        name: 'ComponentsPage',
        components: {
            footer: Footer,
            menu: MainMenu,
            default: ComponentsPage,
        },
    },
]
{{/if_or_eq}}
{{#if_eq setup 'nothing'}}
const routes = [
]
{{/if_eq}}

export default new Router({
    mode: 'history',
    base: __dirname,
    routes,
})
