import ora from 'ora'

import webpack from 'webpack'
import webpacks from './webpack/webpack.config'

const browsers = webpacks.browsers
const node = webpacks.node
const render = webpacks.render

let buildpacks

switch(process.argv[2]) {
case 'render':
    buildpacks = render
    break
default:
    buildpacks = browsers.concat(node)
}

const spinner = ora('building for production...')
spinner.start()

webpack(buildpacks, (err, stats) => {
    spinner.stop()

    if (err) throw err

    process.stdout.write(`${stats.toString({
        colors: true,
        chunks: false,
        timings: true,
        version: false,
    })} '\n'`)
})
