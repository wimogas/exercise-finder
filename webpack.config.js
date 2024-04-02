const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const Dotenv = require('dotenv-webpack');

module.exports = {
   context: __dirname,
   entry: './src/index.js',
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|j?g|gif)?$/,
            use: 'file-loader'
         },
         {
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
         },
         {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
         },
]
   },
   resolve: {
      extensions: ['.tsx', '.ts', '.js'],
   },
   plugins: [
      new Dotenv(),
   ]
};