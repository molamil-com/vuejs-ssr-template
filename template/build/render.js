import webpack from 'webpack'
import renderBundleConfig from './webpacks/render/render'

import ora from 'ora'

const spinner = ora('prerendering site for production...')
spinner.start()

webpack(renderBundleConfig, (err, stats) => {
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
