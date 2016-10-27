import webpack from 'webpack'
import config from '../../config/config'

const baseConfig = {
    resolve: {
        extensions: ['.js', '.json', '.vue', '.css' ],
        modules: ['src', 'views', 'node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.js',
        }
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.vue$/,
                loader: 'eslint',
                include: config.path.src,
                exclude: /node_modules/
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: 'eslint',
                include: config.path.src,
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue',
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: config.path.root,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        // new webpack.NoErrorsPlugin(),
    ]
}

export default baseConfig
