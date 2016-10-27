import webpack from 'webpack'
import config  from '../../config/config'

import nodeExt from 'webpack-node-externals'

const serverConfig = {
    entry: [config.path.src + '/server/index.js'],
    output: {
        path: config.path.dist,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
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
    devtool: 'source-map',
    externals: [
        nodeExt()
    ],
    plugins: [
    ]
}

export default serverConfig
