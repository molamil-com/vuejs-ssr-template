import merge from 'webpack-merge'

import base from './webpacks/base.js'
import app from './webpacks/app.js'
import server from './webpacks/server.js'
import serverBundle from './webpacks/serverBundle.js'

const clientBundleConfig = merge(base, app)
const serverBundleConfig = merge(base, serverBundle)
const serverConfig = merge(base, server)

export default {
    browsers: [clientBundleConfig],
    node: [serverBundleConfig, serverConfig],
}
