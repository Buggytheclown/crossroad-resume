var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
var SRC_ASSETS_DIR = path.resolve(__dirname, "src/assets");
var DIST_ASSETS_DIR = path.resolve(__dirname, "dist/assets");

var config = {
    entry: {
        index: path.join(SRC_DIR + "/app/index/index.js")
    },
    output: {
        path: path.join(DIST_DIR + "/app"),
        filename: "[name]/bundle.js",
        publicPath: "/"
    },
    // watch: true,
    devtool: "source-map",
    devServer: {
        // This is required for older versions of webpack-dev-server
        // if you use absolute 'to' paths. The path should be an
        // absolute path to your build destination.
        contentBase: DIST_DIR,
        // inline: true,
        // hot: true,
        outputPath: SRC_DIR
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
            // {
            //     test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
            //     loader: 'file-loader?name=/images/[name].[ext]'
            // }
        ]
    },
    // sassLoader: {
    //     includePaths: [path.resolve(__dirname, DIST_DIR)]
    // },
    plugins: [
        // new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name]/bundle.css"),
        new CopyWebpackPlugin([
            // Copy directory contents to {output}/to/directory/
            {from: SRC_ASSETS_DIR, to: DIST_ASSETS_DIR},
            {from: SRC_DIR + "/app/index/index.html", to: DIST_DIR + "/app/index"}
        ]),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
        })

    ]
};

module.exports = config;