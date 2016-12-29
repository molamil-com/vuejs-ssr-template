import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'

import config from '../../../config/config'

import development from './development'
import production from './production'

const clientBundleConfig = merge({
    entry: {
        app: `${config.path.src}/entrypoints/client.js`,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]',
                },
            },
        ],
    },
    plugins: [
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
        new CopyWebpackPlugin([
            { from: `${config.path.root}/static`, to: `${config.path.app}/static` },
        ]),
    ],
}, process.env.NODE_ENV === 'production' ? production : development)

export default clientBundleConfig
