import { join, resolve } from 'path'

const config = {
        build: {
                env : {
                        NODE_ENV: 'production'
                },
                cssSourceMap: false,
                productionGzip: false,
                productionGzipExtensions: ['js', 'css']
        },
        dev: {
                env : {
                        NODE_ENV: 'development'
                },
                proxyTable: {},
                // CSS Sourcemaps off by default because relative paths are "buggy"
                // with this option, according to the CSS-Loader README
                // (https://github.com/webpack/css-loader#sourcemaps)
                // In our experience, they generally work as expected,
                // just be aware of this issue when enabling this option.
                cssSourceMap: false,
	              port: 5000
        },
        path: {
		            root: resolve(__dirname, '..'),
		            src:  join(__dirname, '..', '/src'),
		            dist: join(__dirname, '..', '/dist'),
		            app:  join(__dirname, '..', '/dist/app')
	      }
}

export default config
