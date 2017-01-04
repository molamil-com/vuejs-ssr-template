import combineLoaders from 'webpack-combine-loaders'
import config from '../../../config/config'

{{#if_eq template 'ssr'}}
const re = `import.*(${config.modules.browser.map((item) => { return "\\'" + item + "\\'" }).join('|')})`

const sLoader = combineLoaders([
    {
        loader: 'babel-loader',
    },
    {
        loader: 'string-replace-loader',
        query: {
            search: re,
            replace: '/* eslint-disable no-undef */',
            flags: 'g',
        }
    },
]);


const pLoader = combineLoaders([
    {
        loader: 'babel-loader',
    },
    {
        loader: 'string-replace-loader',
        query: {
            search: re,
            replace: '/* eslint-disable no-undef */',
            flags: 'g',
        }
    },
    {
        loader: 'string-replace-loader',
        query: {
            search: 'debug\(.*\)',
            replace: '',
            flags: 'g',
        }
    },
]);

const VueServerBundleLoader = process.env.NODE_ENV === 'production' ? pLoader : sLoader
{{/if_eq}}

const VueAppBundleLoader = combineLoaders([
    {
        loader: 'babel-loader',
    },
    {
        loader: 'string-replace-loader',
        query: {
            search: 'debug\(.*\)',
            replace: '',
            flags: 'g',
        }
    },
]);

{{#if_eq template 'basic'}}
export { VueAppBundleLoader }
{{/if_eq}}

{{#if_eq template 'ssr'}}
export { VueAppBundleLoader, VueServerBundleLoader }
{{/if_eq}}
