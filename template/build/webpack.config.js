import merge from 'webpack-merge'

import base from './webpacks/base.js'
import app from './webpacks/app/app.js'
{{#if_eq template 'ssr'}}
import server from './webpacks/server/server.js'
import serverBundle from './webpacks/server/serverBundle.js'
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
