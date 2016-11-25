import { join, resolve } from 'path'

const config = {
    build: {
        env : {
            NODE_ENV: 'production'
        },
        cssSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env : {
            NODE_ENV: 'development'
        },
        proxyTable: {},
        // (https://github.com/webpack/css-loader#sourcemaps)
        cssSourceMap: false,
        port: 5000
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
    modules: {
        browser: ['vue-slick']
    }
}

export default config
