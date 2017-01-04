import path from 'path'
import cp from 'child_process'
import events from 'events'

import webpackConfig from '../../webpack.config'
import config from '../../../config/config'

import logger from '../tools/logger'

let server,
    emitter

const SERVER_READY_MESSAGE = /The server is running at http:\/\/(.*?)\//

{{#if_eq template 'basic'}}
const serverPath = path.join(`${config.path.root}/build/development/server`, 'server.js')
{{/if_eq}}
{{#if_eq template 'ssr'}}
const { output } = webpackConfig.node[1]
const serverPath = path.join(output.path, output.filename)
{{/if_eq}}

function runServer(fs, cb) {
    function onData(data) {
        // const time = new Date().toTimeString()
        const listening = data.toString('utf8').match(SERVER_READY_MESSAGE)

        logger.log('info', `${data}`)

        if (listening) {
            server.stdout.removeListener('data', onData)
            server.stdout.on('data', data => logger.log('info', `${data}`))

            if (cb) {
                emitter = new events.EventEmitter()
                cb(null, listening[1], emitter)
            } else if (fs.hot()) emitter.emit('hot')
        }
    }

    if (server) {
        server.kill('SIGTERM')
    }

    server = cp.spawn('babel-node', [serverPath], {
        env: Object.assign({
            NODE_ENV: 'development',
            {{#if_eq template 'ssr'}}
            // use output from webpack instead of conf...a bit cleaner.
            TEMPLATE: fs.readFileSync(`${config.path.app}/index.twig`, 'utf-8'),
            {{/if_eq}}
        }, process.env),
        silent: false,
    })

    server.stdout.on('data', onData)
    server.stderr.on('data', data => logger.log('error', `${data}`))
}

process.on('exit', () => {
    if (server) {
        process.nextTick(() => server.kill('SIGTERM'))
    }
})

export default runServer
