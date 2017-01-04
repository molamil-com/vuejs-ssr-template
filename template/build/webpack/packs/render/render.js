import webpack from 'webpack'
import merge from 'webpack-merge'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import PrerenderSpaPlugin from 'prerender-spa-plugin'

import config from '../../../../config/config'
import base from '../base.js'
import app from '../app/app.js'

const renderBundleConfig = merge(base, app, {
    output: {
        path: config.path.static,
        publicPath: '/',
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js',
    },
    devtool: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${config.path.src}/templates/index.html`,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false,
            },
            chunksSortMode: 'dependency',
        }),
        new CopyWebpackPlugin([
            {
                from: `${config.path.root}/static`,
                to: `${config.path.static}/static`,
                ignore: [ 'favicon.ico', '.gitkeep' ],
            },
            {
                from: `${config.path.root}/static/favicon.ico`,
                to: `${config.path.static}`,
            },
        ]),
        new PrerenderSpaPlugin(
            config.path.static,
            config.routes.static,
        ),
    ],
})

export default renderBundleConfig
