const BUILD_ENV = process.env.NODE_ENV == 'production' && ((process.argv.length > 2 && process.argv[process.argv.length - 1] != 'render' && process.argv[process.argv.length - 1]) || 'production')

import webpack from 'webpack'
import ExtendedDefinePlugin from 'extended-define-webpack-plugin'

import config from '../../../config/config'

// Read publicPath from config, set root default if not present for current ENV
let publicPath = '/'
if (BUILD_ENV && typeof config[BUILD_ENV].env.PUBLIC_PATH !== 'undefined') {
    publicPath = config[BUILD_ENV].env.PUBLIC_PATH
}

const baseConfig = {
    resolve: {
        extensions: ['.js', '.json', '.vue', '.css', '.scss'],
        modules: ['src', 'node_modules'],
        alias: {
            vue$: process.env.NODE_ENV === 'production' ? 'vue/dist/vue.min.js'  : 'vue/dist/vue.js',
        },
    },
    output: {
        publicPath: publicPath,
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
                test: /\.css$/,
                loader: 'css-loader',
            },
            {
                test: /\.scss$/,
                loader: 'vue-style-loader!css-loader!sass-loader!',
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            debug: 'debug',
        }),
        new ExtendedDefinePlugin({
            ENV: config[BUILD_ENV || 'development'].env,
        }),
    ],
}

export default baseConfig
