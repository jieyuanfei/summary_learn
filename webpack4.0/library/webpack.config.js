const path = require('path');
// 官网地址: https://webpack.docschina.org/configuration/externals/

module.exports = {
    mode: "production",
    entry: {
		main: './src/index.js',
    },
    // 打包的过程遇到 lodash 不打包
    // externals: [
    //     "lodash"
    // ],
    externals: {
        lodash: {
            commonjs: "lodash"
        }
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "library.js",
        // 把本项目当第三方库使用，把整个项目当做 window.library 的一个属性
        library: "library",
        // 把本项目当第三方库使用，支持 commonJS, require, AMD语法
        libraryTarget: "umd"
    }
}