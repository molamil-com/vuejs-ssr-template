import webpack from 'webpack'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import config from '../../../../config/config'

export default {
    output: {
        path: config.path.app,
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].js',
    },
    devtool: '#eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: config.path.root,
                exclude: /node_modules/,
            },
        ],
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new webpack.LoaderOptionsPlugin({
            vue: {
                loaders: {
                    css: 'vue-style-loader!css-loader',
                    scss: 'vue-style-loader!css-loader!sass-loader',
                },
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
            chunksSortMode: 'dependency',
        }),
    ],
}
