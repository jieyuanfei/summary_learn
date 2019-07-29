const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolveLoader: {
        modules: [
            'node_modules',
            './loaders' // 只加载js名字
        ]
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: [
            //         path.resolve(__dirname, './loaders/replaceLoader.js')
            //     ]
            // },
            {
                test: /\.js$/,
                use: [
                    {
                        // loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
                        loader: 'replaceLoader',
                        options: {
                            name: 'ankerDell_last'
                        }
                    },
                    {
                        // loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
                        loader: 'replaceLoaderAsync',
                        options: {
                            name: 'dell'
                        }
                    }
                ]
            }
        ]
    }
}