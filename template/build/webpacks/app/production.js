import path from 'path'
import webpack from 'webpack'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { VueAppBundleLoader } from '../../loaders/vue-loaders'
import config from '../../../config/config'

const postcss = [
    require('precss')(),
    require('autoprefixer')({ browsers: ['last 3 versions'] }),
]

export default {
    output: {
        path: config.path.app,
        publicPath: '/',
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js',
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    babelrc: false,
                    presets: [
                        [
                            'es2015',
                            {
                                modules: false,
                            },
                        ],
                        [
                            'stage-2',
                        ],
                    ],
                    plugins: [
                        'transform-runtime',
                    ],
                    comments: false,
                },
                include: config.path.root,
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.VUE_ENV': '"client"'
        }),
        new ExtractTextPlugin('css/[name].[contenthash].css'),
        new webpack.LoaderOptionsPlugin({
            vue: {
                loaders: {
                    js: VueAppBundleLoader,
                    babel: VueAppBundleLoader,
                    css: ExtractTextPlugin.extract({
                        loader: 'css-loader',
                        fallbackLoader: 'vue-style-loader'
                    }),
                    scss: ExtractTextPlugin.extract({
                        loader: 'css-loader!sass-loader',
                        fallbackLoader: 'vue-style-loader'
                    }),
                },
                postcss,
            },
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new HtmlWebpackPlugin({
            {{#if_eq template 'basic'}}
            filename: 'index.html',
            template: `${config.path.src}/templates/index.html`,
            {{/if_eq}}
            {{#if_eq template 'ssr'}}
            filename: 'index.twig',
            template: `${config.path.src}/templates/index.twig`,
            {{/if_eq}}
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                removeAttributeQuotes: false,
            },
            chunksSortMode: 'dependency',
        }),
    ],
}
