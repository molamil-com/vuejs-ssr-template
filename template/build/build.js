import webpack from 'webpack'
import webpackConfig from './webpack.config'

import ora from 'ora'

const spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, (err, stats) => {
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
