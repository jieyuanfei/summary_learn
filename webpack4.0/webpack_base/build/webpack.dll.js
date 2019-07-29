const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 单独打包第三方文件
module.exports = {
    mode: 'production',
    entry: {
        react: ['react', 'react-dom'],
        vendors: ['lodash', 'jquery']
    },
    output: {
        filename: "[name].dll.js",
        path: path.resolve(__dirname, '../dll'),
        library: '[name]'
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         minSize: 60000
    //     }
    // },
    plugins: [
        new CleanWebpackPlugin(['dll'], {
            root: path.resolve(__dirname, '../')
        }),
        // 用这个插件来分析第三方库，把分析对应的映射关系放到 manifest.json 文件中
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, '../dll/[name].manifest.json')
        })
    ]
}