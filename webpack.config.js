var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// require("font-awesome-webpack");

// require("font-awesome-webpack!./path/to/font-awesome.config.js");


var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');

var BOWER_COMPONENTS = path.resolve(ROOT_PATH, 'app/bower_components')

module.exports= {
  entry: {
    app: path.resolve(APP_PATH, 'index.jsx'),
    //添加要打包在vendors里面的库
    vendors: [
      // 'jquery',
      // 'jQueryCookie',
      // 'bootstrap'
      // path.resolve(BOWER_COMPONENTS, './jquery/dist/jquery.min.js'),
      // path.resolve(BOWER_COMPONENTS, './jquery.cookie/jquery.cookie.js'),
      // path.resolve(BOWER_COMPONENTS, './bootstrap/dist/js/bootstrap.min.js')
    ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: 'http://localhost:8080/', // 打包文件内用到的URL路径, 比如背景图等(可以设成http的地址, 比如: http://cdn.my.com)
    filename: '[name].[hash].js'
  },
  //enable dev source map
  devtool: 'eval-source-map',
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'jquery': path.resolve(BOWER_COMPONENTS, './jquery/dist/jquery.min.js'),
      "jQueryCookie": path.resolve(BOWER_COMPONENTS, './jquery.cookie/jquery.cookie.js'),
      // "bootstrap": path.resolve(BOWER_COMPONENTS, './bootstrap/dist/js/bootstrap.min.js')
    }
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
        test: /\.(css|scss)$/,
        loaders: ['style', 'css', 'sass']
      },
      */
      {
        test: /\.(css|scss)$/, loader: 'style!css!sass'
      },
      // {
      //   test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer')
      // },

      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      },

      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }

    ]
  },
  plugins: [
    // 解决
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    //这个使用uglifyJs压缩你的js代码
    // new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //把入口文件里面的数组打包成verdors.js
    // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlwebpackPlugin({
      // title: 'My first react app'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      // "window.jQuery": 'jquery',
      "jQueryCookie": 'jQueryCookie'
    })
  ]
}
