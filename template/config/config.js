import { join, resolve } from 'path'

const config = {
    development: {
        env : {
            BUILD_ENV: 'development'
        },
        proxyTable: {},
        // (https://github.com/webpack/css-loader#sourcemaps)
        cssSourceMap: false,
        port: 5000
    },
    staging: {
        env : {
            BUILD_ENV: 'staging'
        },
        cssSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    production: {
        env : {
            BUILD_ENV: 'production'
        },
        cssSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    path: {
        root: resolve(__dirname, '..'),
        src: join(__dirname, '..', '/src'),
        dist: join(__dirname, '..', '/dist'),
        app: join(__dirname, '..', '/dist/app'),
        static: join(__dirname, '..', '/dist/app-static')
    },
    routes: {
        static: ['/'],
    },
    browserslist: [
        '> 0.5%',
        'last 3 versions',
    ],
    {{#if_eq template 'ssr'}}
    modules: {
        browser: ['gsap'],
        server: {
            white: []
        }
    },
    {{/if_eq}}
}

export default config
