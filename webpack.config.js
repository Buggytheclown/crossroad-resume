var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: path.join(SRC_DIR + "/app/js/index.js"),
    output: {
        path: path.join(DIST_DIR + "/app"),
        filename: "[name].js",
        publicPath: DIST_DIR
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
                // loader: "css-loader!sass-loader"
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
        new ExtractTextPlugin("styles.css")
    ]
};

module.exports = config;