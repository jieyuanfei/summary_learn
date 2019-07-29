const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');

const config = {
	mode: 'development',
	output: {
		// publicPath: "www.cdn.com",
		// publicPath: '/',
		filename: '[name].js',
		chunkFilename: '[name].js'
	},
	devtool: 'cheap-module-eval-source-map',
	// devtool: 'inline-source-map',
	// devtool: 'eval',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8866,
		hot: true, 		// 方便调试 css
		// hotOnly: true	// 不人浏览器自动刷新
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
							// modules: true // css 做模块化
						}
					},
					"sass-loader",
					"postcss-loader"
				]
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader"
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}

module.exports = merge(config, commonConfig);