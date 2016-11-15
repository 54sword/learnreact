var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');

var config = require('./config/config.js');

module.exports= {
  entry: {
    app: [
      path.resolve(APP_PATH, 'index.jsx')
    ],
    //添加要打包在vendors里面的库
    vendors: [
      // path.resolve(BOWER_COMPONENTS, './jquery.cookie/jquery.cookie.js'),

      // path.resolve(BOWER_COMPONENTS, './bootstrap/dist/css/bootstrap.min.css'),
      // path.resolve(BOWER_COMPONENTS, './bootstrap/dist/js/bootstrap.min.js'),
    ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: config.PUBLIC_PATH+'/', // 打包文件内用到的URL路径, 比如背景图等(可以设成http的地址, 比如: http://cdn.my.com)
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
    }
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], include: APP_PATH },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[hash:base64:5]',
          'resolve-url',
          'sass'
        ],
        include: APP_PATH
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(png|jpg|gif)$/, loader: 'url?limit=40000' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  plugins: [
    // 删除旧的打包文件
    new CleanWebpackPlugin(['build'], {
      root: ROOT_PATH,
      verbose: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({
      // output: {
      //   comments: false,
      // },
      // minimize: true,
      compress: {
        warnings: false
      }
    }),
    //把入口文件里面的数组打包成verdors.js
    // new webpack.optimize.CommonsChunkPlugin('common.[hash].js', ['app', 'vendors']),
    new HtmlwebpackPlugin({
      title: config.name,
      public_path: config.PUBLIC_PATH,
      template: path.resolve(APP_PATH, 'views/index.html')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery'
    })
  ]
}
