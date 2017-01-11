var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var APP_PATH = path.resolve(__dirname, 'release');
var SRC_PATH = path.resolve(__dirname, 'src');

var ex = {
    cache: true,
    target: 'electron',
    entry: {
        app: './src/render/app.js'
    },
    output: {
        path: APP_PATH,
        publicPath:'./release/',
        filename: '[name].js',
        chunkFilename: '[name],[chunkhash].min.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exlude: /^node_modules$/,
            loader: 'babel'
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.(png|jpe?g|gif)(\?\S*)?$/,
            loader: 'file-loader?limit=8192&name=[name].[hash:8].[ext]'
        }, {
            test: /\.(otf|eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader?name=[name].[hash:8].[ext]'
        }]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
}

module.exports = ex;