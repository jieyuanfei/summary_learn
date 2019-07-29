const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const makePlugins = (configs) => {
    const plugins = [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../')
        })
    ];

    Object.keys(configs.entry).forEach(item => {
        plugins.push(
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: `${item}.html`,
                chunks: [item]
            })
        )
    })

    const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
    files.forEach(file => {
        if (/.*\.dll.js$/.test(file)) {
            plugins.push(
                new addAssetHtmlWebpackPlugin({
                    filepath: path.resolve(__dirname, '../dll', file)
                })
            )
        } else if (/.*\.manifest.json$/.test(file)) {
            plugins.push(
                new webpack.DllReferencePlugin({
                    manifest: path.resolve(__dirname, '../dll', file)
                })
            )
        }
    });

    return plugins;
}

// const 
const configs = {
    entry: {
        // lodash: './src/lodash.js',
        index: './src/index.js',
        list: './src/list.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 	name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 1024 * 9
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: 'icon/'
                    }
                }
            },
            {
                // test: /\.js$/,
                // exclude: /node_modules/,
                // loader: "babel-loader",
                // use: [
                // 	{
                // 		loader: "babel-loader"
                // 	},
                // {
                // 	// 默认情况下，模块里面的 this 指向模块本身，
                // 	// 使用 "imports-loader" 来改变 this 执行，这里指向 window
                // 	loader: "imports-loader?this=>window"
                // }
                // ]
                // options: {
                // 	/**
                // 	 * @babel/polyfill
                // 	 * 按需加载 把 箭头函数，promise 转换成支持低版本 的语法
                // 	 */
                // 	presets: [["@babel/preset-env", {
                // 		useBuiltIns: 'usage'
                // 	}]]
                // }
            }
        ]
    },
    // mainfest
    // plugins: [
    // new HtmlWebpackPlugin({
    // 	template: './src/index.html'
    // }),
    // new CleanWebpackPlugin(['dist'], {
    // 	root: path.resolve(__dirname, '../')
    // }),
    // // 模块引入 $
    // new webpack.ProvidePlugin({
    // 	'$': 'jquery',
    // 	'_': 'lodash'
    // }),
    // 往模板文件添加文件
    // new addAssetHtmlWebpackPlugin({
    // 	filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
    // }),
    // new addAssetHtmlWebpackPlugin({
    // 	filepath: path.resolve(__dirname, '../dll/react.dll.js')
    // }),
    /**
     * 找到对应的映射关系
     * 不从 node_modules 中找该文件
     * 直接去第三方打包的文件中找
     */
    // new webpack.DllReferencePlugin({
    // 	manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
    // }),
    // new webpack.DllReferencePlugin({
    // 	manifest: path.resolve(__dirname, '../dll/react.manifest.json')
    // })
    // ],
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all',
            // minSize: 30000,
            // maxSize: 0,
            // minChunks: 1,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // automaticNameDelimiter: '~',
            // name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    // filename: "vendors.js"
                    name: 'vendors'
                },
                // default: {
                // 	minChunks: 2,
                // 	priority: -20,
                // 	reuseExistingChunk: true
                // }
            }
        }
    },
    performance: false, // 不让提示性能上的问题
    output: {
        // publicPath: "www.cdn.com",
        // publicPath: '/',
        // filename: '[name].js',
        // chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, '../dist')
    },
}

configs.plugins = makePlugins(configs);

module.exports = configs;