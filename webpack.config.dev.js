var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var APP_PATH = path.resolve(__dirname, 'dev/release');
var SRC_PATH = path.resolve(__dirname, 'src');
var PRO_PATH = path.resolve(__dirname);

var ex = {
    cache: true,
    target: 'electron',
    entry: {
        app: './src/render/app.js'
    },
    output: {
        path: APP_PATH,
        publicPath: './release/',
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
            test: /\.(eot|svg|ttf|woff|woff2|md)(\?\S*)?$/,
            loader: 'file-loader'
        }, {
            test: require.resolve("./src/source/llqrcode.js"),
            loader: "exports?qrcode"
        }, {
            test: require.resolve("./src/source/qrcanvas.js"),
            loader: "exports?createQRImage"
        }, {
            test: require.resolve("./src/source/qrcode.js"),
            loader: "exports?QRCode&QRErrorCorrectLevel"
        }]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: path.resolve(PRO_PATH, 'main.js'), to: '../main.js' },
            { from: path.resolve(PRO_PATH, 'index.html'), to: '../index.html' },
            { from: path.resolve(PRO_PATH, 'package.json'), to: '../package.json' },
            { from: path.resolve(PRO_PATH, 'readme.md'), to: '../readme.md' },
            { from: path.resolve(PRO_PATH, 'process'), to: '../process' }
        ])
    ]
}

module.exports = ex;