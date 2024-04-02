const {merge} = require('webpack-merge');
const common = require('./webpack.config.js');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve( __dirname, 'src/index.html' ),
            filename: 'index.html'
        })
    ]
});