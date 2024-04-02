const {merge} = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require("path");

module.exports = merge(common, {
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    output: {
        path: path.resolve( __dirname, 'public' ),
        filename: 'main.js',
        publicPath: '/',
    },
});