import merge from 'webpack-merge'

import base from './webpack/base.js'
import app from './webpack/app/app.js'
{{#if_eq template 'ssr'}}
import server from './webpack/server/server.js'
import serverBundle from './webpack/server/serverBundle.js'

{{/if_eq}}
const clientBundleConfig = merge(base, app)
{{#if_eq template 'ssr'}}
const serverBundleConfig = merge(base, serverBundle)
const serverConfig = merge(base, server)
{{/if_eq}}

export default {
    browsers: [clientBundleConfig],
    {{#if_eq template 'basic'}}
    node: [],
    {{/if_eq}}
    {{#if_eq template 'ssr'}}
    node: [serverBundleConfig, serverConfig],
    {{/if_eq}}
}
