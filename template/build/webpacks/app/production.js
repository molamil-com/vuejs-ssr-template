import path from 'path'
import webpack from 'webpack'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import config from '../../../config/config'

const postcss = [
    require('precss')(),
    require('autoprefixer')({ browsers: ['last 3 versions'] }),
]

export default {
    output: {
        path: config.path.app,
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
        new ExtractTextPlugin('css/[name].[contenthash].css'),
        new webpack.LoaderOptionsPlugin({
            vue: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        loader: 'css-loader',
                        fallbackLoader: 'vue-style-loader',
                    }),
                },
                postcss,
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module, count) => (
                    module.resource &&
                        /\.js$/.test(module.resource) &&
                        module.resource.indexOf(
                            path.join(config.path.root, './node_modules')
                        ) === 0
                ),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor'],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.twig',
            template: `${config.path.src}/templates/index.twig`,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false,
            },
            chunksSortMode: 'dependency',
        }),
    ],
}
