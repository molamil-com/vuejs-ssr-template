import merge from 'webpack-merge'

import base from './packs/base.js'
import app from './packs/app/app.js'
{{#if_eq template 'ssr'}}
import server from './packs/server/server.js'
import serverBundle from './packs/server/serverBundle.js'
{{/if_eq}}
import renderBundleConfig from './packs/render/render'

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
    render: [renderBundleConfig],
}
