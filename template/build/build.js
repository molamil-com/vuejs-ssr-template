import webpack from 'webpack'
import webpacks from './webpack.config'

import ora from 'ora'

const browsers = webpacks.browsers
const node = webpacks.node

const spinner = ora('building for production...')
spinner.start()

webpack(browsers.concat(node), (err, stats) => {
    spinner.stop()

    if (err) throw err

    process.stdout.write(`${stats.toString({
        colors: true,
        modules: false,
        children: true,
        chunks: false,
        chunkModules: false,
    })} '\n'`)
})
