import webpack from 'webpack'
import nodeExt from 'webpack-node-externals'

import config  from '../../config/config'

const serverBundleConfig = {
        entry: [config.path.src + '/entrypoints/server.js'],
        output: {
                path: config.path.dist,
                libraryTarget: 'commonjs2',
                filename: 'bundle.server.js'
        },
        target: 'node',
        externals: [nodeExt()],
        devtool: false,
        plugins: [
                new webpack.DefinePlugin({
                        'process.env': {
                                NODE_ENV: '"production"'
                        }
			                  //VUE_ENV: "'server'",
                        //BROWSER: false
		            })
        ]
}

export default serverBundleConfig
