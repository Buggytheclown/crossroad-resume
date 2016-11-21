var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
var ASSETS_SRC_DIR = path.resolve(__dirname, "src/assets");
var ASSETS_DIST_DIR = path.resolve(__dirname, "dist/app/assets");

var config = {
    entry: path.join(SRC_DIR + "/app/index.js"),
    output: {
        path: path.join(DIST_DIR + "/app"),
        filename: "bundle.js",
        publicPath: "/app/"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                loader: 'file-loader?name=/images/[name].[ext]'
            }
        ]
    },
    // sassLoader: {
    //     includePaths: [path.resolve(__dirname, DIST_DIR)]
    // },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new CopyWebpackPlugin([
            // Copy directory contents to {output}/to/directory/
            {from: ASSETS_SRC_DIR, to: ASSETS_DIST_DIR}
        ])
    ]
};

module.exports = config;