const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const config = {
	mode: 'production',
	// devtool: 'cheap-module-source-map',
	output: {
		// publicPath: "www.cdn.com",
		// publicPath: '/',
		// filename: '[name].[contenthash].js',	// 根据内容产生一个 hash 值，内容不变，hash值不变 
		// chunkFilename: '[name].[contenthash].js',
		filename: '[name].js',
		chunkFilename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
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
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader"
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css',
		}),
		new WorkboxWebpackPlugin.GenerateSW({
			cacheId: 'webpack-pwa', // 设置前缀
			skipWaiting: true, // 强制等待中的 Service Worker 被激活
			clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
			// swDest: 'service-wroker.js', // 输出 Service worker 文件
			// globPatterns: ['**/*.{html,js,css,png.jpg}'], // 匹配的文件
			// globIgnores: ['service-wroker.js'], // 忽略的文件
			// runtimeCaching: [
			// 	// 配置路由请求缓存
			// 	{
			// 		urlPattern: /.*\.js/, // 匹配文件
			// 		handler: 'networkFirst' // 网络优先
			// 	}
			// ]
		})
	],
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin({})
		]
	},
}

module.exports = merge(config, commonConfig);