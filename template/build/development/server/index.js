import webpack from 'webpack'
import webpackConfig from '../../webpack.config'

import webpackMiddleware from 'webpack-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

{{#if_eq template 'ssr'}}
const historyApiFallback = () => { return (req, res, next) => { next() } }
{{/if_eq}}
{{#unless_eq template 'ssr'}}
import historyApiFallback from 'connect-history-api-fallback'
{{/unless_eq}}

import fs from 'memory-fs'
import chalk from 'chalk'

import BrowserSync from 'browser-sync'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

import config from '../../../config/config'
import runServer from './runServer'

{{#if_eq template 'basic'}}
const index = 'index.html'
const serverSideRender = false
{{/if_eq}}
{{#if_eq template 'ssr'}}
const index = 'index.twig'
const serverSideRender = true
{{/if_eq}}

// put these into a module....
function createBundle(webpacks) {
    return new Promise((resolve) => {
        const browsers = webpacks.browsers.map((pack) => {
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
    return new Promise((resolve) => {
        const compiler = webpack(bundle)

        compiler.compilers
            .filter((compiler) => compiler.options.target !== 'node')
            .map(compiler => compiler.outputFileSystem = fs)

        compiler.apply(new ProgressBarPlugin({
            format: `  build [:bar] ${  chalk.green.bold(':percent')  } (:elapsed seconds)`,
            clear: true,
        }))

        resolve(compiler)
    })
}

function addMiddlewares(compiler) {
    return new Promise((resolve) => {
        const historyFallbackMiddleware = historyApiFallback()
        const hotMiddlewares = compiler.compilers
              .filter((compiler) => compiler.options.target !== 'node')
              .map(compiler => webpackHotMiddleware(compiler))

        // put in config and use also in build.js
        const wpMiddleware = webpackMiddleware(compiler, {
            publicPath: '/',
            index: index,
            stats: {
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
            },
            serverSideRender: serverSideRender,
        })

        resolve([hotMiddlewares, wpMiddleware, historyFallbackMiddleware])
    })
}

function initServer(compiler, middlewares) {
    return new Promise((resolve) => {
        const [hotMiddlewares, wpMiddleware, historyFallbackMiddleware] = middlewares
        const fs = wpMiddleware.fileSystem

        let bundlingComplete = (fs) => {
            runServer(fs, (err, host, emitter) => {
                if (err) throw err

                const bs = BrowserSync.create()
                bs.init({
                    proxy: {
                        // create function to add wrap wpiddle in fallback - using a config.
                        middleware: [historyFallbackMiddleware,
                                     wpMiddleware,
                                     historyFallbackMiddleware,
                                     ...hotMiddlewares],
                        target: host,
                    },
                    files: [],
                }, resolve)

                // put handling of fs and bs into seperate fun.
                // probably no need for custom fs though....
                fs.watch(`${config.path.app}/${index}`)
                emitter.on('hot', () => bs.reload())

                bundlingComplete = runServer
            })
        }

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
