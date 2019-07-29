const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: {
        main: './src/index.js',
    },
    resolve: {
        // extenions: ['.js', '.jsx'],
        alias: {
            // 文件别名
            child: path.resolve(__dirname, "./a/b/c/child")
        }
    },
    devServer: {
		contentBase: './dist',
		open: true,
		port: 8888,
		hot: true, 		// 方便调试 css
        hotOnly: true,	// 不人浏览器自动刷新
        historyApiFallback: true,
        proxy: {
            '/react/api': {
                target: 'http://www.dell-lee.com',
                // 自动把 header.json 替换为 demo.json
                pathRewrite: {
                    'header.json': 'demo.json'
                }
            }
        }
	},
    module: {
        rules: [
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
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ]
}