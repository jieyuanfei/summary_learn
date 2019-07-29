const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const complier = webpack(config);   // 编译器

let app = express();
app.use(webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath
}));


app.listen(3232, () => {
    console.log('server is running');
});