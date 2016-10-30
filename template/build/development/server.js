import webpack from 'webpack'
import webpackConfig from '../webpack.config'

import appConfig from '../../config/config'

import webpackMiddleware from 'webpack-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import BrowserSync from 'browser-sync'

import runServer from './runServer'

import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import chalk from 'chalk';

import path from 'path'
const resolve = file => path.resolve(__dirname, file)

// put these into a module....
function createBundle(webpacks) {
    return new Promise(resolve => {

        const browsers = webpacks.browsers.map(pack => {
            // create new pack instead of mutating...currently only returning non-node.
            // or just mutate and return original pack-array....
            pack.entry = ['webpack-hot-middleware/client', pack.entry.app]
            pack.plugins.push(new webpack.HotModuleReplacementPlugin())

            return pack
        })

        const node = webpacks.node

        resolve(browsers.concat(node))
    })
}

function createCompiler(bundle) {
    return new Promise(resolve => {
        const compiler = webpack(bundle)

        compiler.apply(new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: true
        }))

        resolve(compiler)
    })
}

function createMiddlewares(compiler) {
    return new Promise(resolve => {
        const hotMiddlewares = compiler.compilers.filter(compiler => {
            return compiler.options.target !== 'node'
        }).map(compiler => webpackHotMiddleware(compiler))

        // put in config and use also in build.js
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

        resolve([hotMiddlewares, wpMiddleware])
    })
}

function initServer(compiler, middlewares) {
    return new Promise((resolve) => {
        let bundlingComplete = (fs) => {

            runServer(fs, (err, host) => {
                if (err) throw err

                const bs = BrowserSync.create()

                bs.init({
                    proxy: {
                        middleware: [wpMiddleware, ...hotMiddlewares],
                        target: host,
                    },
                    //files: ['./**/*.*'],
                }, resolve)

                bundlingComplete = runServer
            })
        }

        const [hotMiddlewares, wpMiddleware] = middlewares
        const fs = wpMiddleware.fileSystem

        compiler.plugin('done', () => bundlingComplete(fs))
    })
}

async function start() {
    const bundle = await createBundle(webpackConfig)
    const compiler = await createCompiler(bundle)
    const middlewares = await createMiddlewares(compiler)

    await initServer(compiler, middlewares)
}

export default start
