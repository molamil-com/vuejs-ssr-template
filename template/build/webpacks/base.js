import webpack from 'webpack'
import config from '../../config/config'

const baseConfig = {
    resolve: {
        extensions: ['.js', '.json', '.vue', '.css'],
        modules: ['src', 'node_modules'],
        alias: {
            vue$: process.env.NODE_ENV === 'production' ? 'vue/dist/vue.min.js'  : 'vue/dist/vue.js',
        },
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.vue$/,
                loader: 'eslint-loader',
                include: config.path.src,
                exclude: /node_modules/,
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                include: config.path.src,
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            window: 'window-or-global',
            debug: 'debug',
        }),
    ],
}

export default baseConfig
