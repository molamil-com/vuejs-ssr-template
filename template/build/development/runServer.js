import webpackConfig from '../webpack.config.js'
import config     from '../../config/config'

import path from 'path'
import cp   from 'child_process'
import events from 'events'

let server, emitter

const RUNNING_REGEXP = /The server is running at http:\/\/(.*?)\//
const { output } = webpackConfig[2]
const serverPath = path.join(output.path, output.filename)

function runServer(fs, cb) {
    function onStdOut(data) {
        const time = new Date().toTimeString()
        const match = data.toString('utf8').match(RUNNING_REGEXP)

        process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '))
        process.stdout.write(data)

        if(match) {
            server.stdout.removeListener('data', onStdOut)
            server.stdout.on('data', x => process.stdout.write(x))

            if(cb) {
                emitter = new events.EventEmitter()
                cb(null, match[1], emitter)
            } else {
                // if(fs.hot()) emitter.emit('hot')
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
        server.kill('SIGTERM')
    }
})

export default runServer
