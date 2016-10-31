import webpackConfig from '../webpack.config.js'
import config from '../../config/config'

import path from 'path'
import cp from 'child_process'
import events from 'events'

import logger from './tools/logger'

let server, emitter

// put in conf
const SERVER_READY_MESSAGE = /The server is running at http:\/\/(.*?)\//

const { output } = webpackConfig.node[1]
const serverPath = path.join(output.path, output.filename)

function runServer(fs, cb) {
    function onStdOut(data) {
        const time = new Date().toTimeString()
        const match = data.toString('utf8').match(SERVER_READY_MESSAGE)

        logger.log('info', `${data}`)

        if(match) {
            server.stdout.removeListener('data', onStdOut)
            server.stdout.on('data', data => logger.log('info', `${data}`))

            if(cb) {
                emitter = new events.EventEmitter()
                cb(null, match[1], emitter)
            } else {
                if(fs.hot()) emitter.emit('hot')
            }
        }
    }

    if(server) {
        server.kill('SIGTERM')
    }

    server = cp.spawn('node', [serverPath], {
        env: Object.assign({
            NODE_ENV: 'development',
            // use output from webpack instead of conf...a bit cleaner.
            TEMPLATE: fs.readFileSync(config.path.app + '/index.twig', 'utf-8')
        }, process.env),
        silent: false,
    })

    server.stdout.on('data', onStdOut)
    server.stderr.on('data', x => process.stderr.write(x))
}

process.on('exit', () => {
    if(server) {
        process.nextTick(() => server.kill('SIGTERM'))
    }
})

export default runServer
