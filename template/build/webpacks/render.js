import merge from 'webpack-merge'
import PrerenderSpaPlugin from 'prerender-spa-plugin'

import config  from '../../config/config'
import base from './base.js'
import app from './app.js'

const renderBundleConfig = merge(base, app, {
    output: {
        path:          config.path.static,
        filename:      'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    plugins: [
        new PrerenderSpaPlugin(
            config.path.static,
            ['/', '/home']
        )
    ]
})

export default renderBundleConfig
