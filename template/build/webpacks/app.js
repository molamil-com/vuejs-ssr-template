import path from 'path'

import webpack from 'webpack'
import merge   from 'webpack-merge'
import config  from '../../config/config'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const postcss = [
    require('precss')(),
    require('autoprefixer')({ browsers: ['last 3 versions'] })
]

const development = {
    output: {
        path:          config.path.app,
        publicPath:    '/',
        filename:      'js/[name].js',
        chunkFilename: 'js/[id].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: config.path.root,
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.twig',
            template: config.path.src + '/templates/index.twig',
            inject: true,
            chunksSortMode: 'dependency'
        })
    ]
}

const production = {
    output: {
        path:          config.path.app,
        filename:      'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    babelrc: false,
                    presets: [
                        [
                            'es2015',
                            {
                                modules: false
                            }
                        ],
                        [
                            'stage-2'
                        ]
                    ],
                    plugins: [
                        'add-module-exports',
                        'transform-runtime',
                    ],
                    comments: false
                },
                include: config.path.root,
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            vue: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        loader: 'css',
                        fallbackLoader: 'vue-style'
                    })
                },
                postcss: postcss
            }
        }),
        new ExtractTextPlugin('css/[name].[contenthash].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module, count) => {
                return (
                    module.resource &&
                        /\.js$/.test(module.resource) &&
                        module.resource.indexOf(
                            path.join(config.path.root, './node_modules')
                        ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:   'manifest',
            chunks: ['vendor']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.twig',
            template: config.path.src + '/templates/index.twig',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
            },
            chunksSortMode: 'dependency'
        })
    ]
}

const clientBundleConfig = merge({
    entry: {
        app: config.path.src + '/entrypoints/client.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}, process.env.NODE_ENV === 'production' ? production : development)

export default clientBundleConfig
