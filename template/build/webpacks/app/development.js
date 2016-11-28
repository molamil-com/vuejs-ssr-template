import webpack from 'webpack'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import config from '../../../config/config'

export default {
    output: {
        path: config.path.app,
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].js',
    },
    devtool: 'source-map',
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.twig',
            template: `${config.path.src}/templates/index.twig`,
            inject: true,
            chunksSortMode: 'dependency',
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: true
        }),
    ],
}
