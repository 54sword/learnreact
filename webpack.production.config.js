var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');

module.exports= {
  entry: {
    app: path.resolve(APP_PATH, 'index.jsx'),
    //添加要打包在vendors里面的库
    vendors: ['jquery', path.resolve(APP_PATH, 'static/js/libs/jquery.cookie.js')]
  },
  output: {
    path: BUILD_PATH, // 文件输出的目录
    publicPath: 'http://localhost:8080', // 打包文件内用到的URL路径, 比如背景图等(可以设成http的地址, 比如: http://cdn.my.com)
    filename: '[name].[hash].js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: APP_PATH
      },
      /*
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      */
      {
        test: /\.scss$/, loader: 'style!css!sass'
      },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // 删除就的打包文件
    new CleanWebpackPlugin(['build'], {
      root: ROOT_PATH,
      verbose: true,
      dry: false
    }),
    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //把入口文件里面的数组打包成verdors.js
    // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlwebpackPlugin({
    }),
    // new ExtractTextPlugin("./app/reset.scss", {
    //   allChunks: true
    // }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "jQueryCookie": path.resolve(APP_PATH, 'static/js/libs/jquery.cookie.js')
    })
  ]
}
