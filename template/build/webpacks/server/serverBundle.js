import webpack from 'webpack'
import nodeExt from 'webpack-node-externals'
import combineLoaders from 'webpack-combine-loaders'

import config from '../../../config/config'

const re = `import.*(${config.modules.browser.map((item) => { return "\\'" + item + "\\'" }).join('|')})`
const sLoader = combineLoaders([
    {
        loader: 'babel-loader',
    },
    {
        loader: 'string-replace-loader',
        query: {
            search: re,
            replace: '/* eslint-disable no-undef */',
            flags: 'g',
        }
    }
]);

const serverBundleConfig = {
    entry: [`${config.path.src}/entrypoints/server.js`],
    output: {
        path: config.path.dist,
        libraryTarget: 'commonjs2',
        filename: 'bundle.server.js',
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: config.path.root,
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
            },
        ],
    },
    target: 'node',
    externals: [nodeExt({
        whitelist: config.modules.server.white
    })],
    plugins: [
        new webpack.LoaderOptionsPlugin({
            vue: {
                loaders: {
                    js: sLoader,
                    babel: sLoader
                },
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            beautify: true
        }),
    ],
}

export default serverBundleConfig
