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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.VUE_ENV': '"client"'
        }),
        new ExtractTextPlugin('css/[name].[contenthash].css'),
        new webpack.LoaderOptionsPlugin({
            vue: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        loader: 'vue-style-loader!css-loader'
                    }),
                    scss: ExtractTextPlugin.extract({
                        loader: 'vue-style-loader!css-loader!sass-loader'
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
            filename: 'index.twig',
            template: `${config.path.src}/templates/index.twig`,
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
