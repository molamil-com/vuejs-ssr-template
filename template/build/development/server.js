import webpack from 'webpack'
import webpackConfig from '../webpack.config'

import webpackMiddleware from 'webpack-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import fs from 'memory-fs'
import path from 'path'
import chalk from 'chalk';

import BrowserSync from 'browser-sync'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

import config from '../../config/config'
import runServer from './runServer'

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

        compiler.compilers.filter(compiler => {
            return compiler.options.target !== 'node'
        }).map(compiler => compiler.outputFileSystem = fs)

        compiler.apply(new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: true
        }))

        resolve(compiler)
    })
}

function addMiddlewares(compiler) {
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

            runServer(fs, (err, host, emitter) => {
                if (err) throw err

                const bs = BrowserSync.create()
                bs.init({
                    proxy: {
                        middleware: [wpMiddleware, ...hotMiddlewares],
                        target: host,
                    },
                    files: [],
                }, resolve)

                fs.watch(`${config.path.app}/index.twig`)

                emitter.on('hot', () => bs.reload())
                bundlingComplete = runServer
            })
        }

        const [hotMiddlewares, wpMiddleware] = middlewares
        const fs = wpMiddleware.fileSystem

        compiler.plugin('done', () => bundlingComplete(fs))
    })
}

async function start() {
    // there is no particular reason that these are async. just good habit.
    const bundle = await createBundle(webpackConfig)
    const compiler = await createCompiler(bundle)
    const middlewares = await addMiddlewares(compiler)

    await initServer(compiler, middlewares)
}

export default start
