import webpack from 'webpack'
import nodeExt from 'webpack-node-externals'

import config from '../../config/config'

const serverConfig = {
    entry: [`${config.path.src}/server/index.js`],
    output: {
        path: config.path.dist,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
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
        ],
    },
    target: 'node',
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
    externals: [
        nodeExt(),
    ],
    plugins: [
    ],
}

export default serverConfig
