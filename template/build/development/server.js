import webpack       from 'webpack'
import webpackConfig from '../webpack.config'

import appConfig  from '../../config/config'

import webpackMiddleware    from 'webpack-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import BrowserSync from 'browser-sync'

import runServer from './runServer'

import path from 'path'
const resolve = file => path.resolve(__dirname, file)

//import run from './tools/run'
//import clean from './tools/clean'
//import copy from './tools/copy'

async function start() {
    await new Promise(resolve => {
        webpackConfig.filter(x => x.target !== 'node').forEach(config => {
            config.entry = ['webpack-hot-middleware/client', config.entry.app]

			      config.plugins.push(new webpack.HotModuleReplacementPlugin())

            const compiler = webpack(webpackConfig)
            compiler.apply(new webpack.ProgressPlugin({
			          profile: false
            }))

            const hotMiddlewares = compiler.compilers.filter(compiler => {
			          return compiler.options.target !== 'node'
            }).map(compiler => webpackHotMiddleware(compiler))

            const wpMiddleware = webpackMiddleware(compiler, {
			          publicPath: '/',
                index: 'index.twig',
			          stats: {
                    colors:       true,
                    modules:      false,
                    children:     true,
                    chunks:       false,
                    chunkModules: false
                },
                serverSideRender: true
		        })

            const fs = wpMiddleware.fileSystem

            let handleServerBundleComplete = (fs) => {
                const watchPath = resolve(fs.readFileSync(appConfig.path.app + '/index.twig', 'utf-8'))

                runServer(fs, (err, host) => {
				            if(!err) {
                        const bs = BrowserSync.create()

                        bs.init({
						                proxy: {
							                  target: host,
							                  middleware: [wpMiddleware, ...hotMiddlewares],
						                },
						                files: [watchPath + '/*'],
					              }, resolve)

                        handleServerBundleComplete = runServer
				            }
			          })
            }
            compiler.plugin('done', () => handleServerBundleComplete(fs))
        })
    })
}

export default start
