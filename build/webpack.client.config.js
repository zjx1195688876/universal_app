const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const config = merge(base, {
    entry: {
        app: './src/entry-client.js'
    },
    // resolve: {
    //     alias: {
    //     'create-api': './create-api-client.js'
    //     }
    // },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            chunks: "all",
            minSize: 3000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 5,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: "vendors",
                },
                // vendors: {
                //     test: /node_modules\/(regularjs|regular-state|nek-ui)/,
                //     priority: -8,
                //     name: "vendors",
                // },
                // common: {
                //     test: /node_modules/,
                //     priority: -9,
                //     name: "common",
                // },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new VueSSRClientPlugin()
    ]
})

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        // auto generate service worker
        new SWPrecachePlugin({
            cacheId: 'vue-hn',
            filename: 'service-worker.js',
            minify: true,
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
            runtimeCaching: [
                {
                    urlPattern: '/',
                    handler: 'networkFirst'
                },
                {
                    urlPattern: /\/(top|new|show|ask|jobs)/,
                    handler: 'networkFirst'
                },
                {
                    urlPattern: '/item/:id',
                    handler: 'networkFirst'
                },
                {
                    urlPattern: '/user/:id',
                    handler: 'networkFirst'
                }
            ]
        })
    )
}

module.exports = config;
