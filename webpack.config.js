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
      'jquery',
      path.resolve(NODE_MODULES_PATH, 'swiper/dist/css/swiper.min.css'),
      path.resolve(NODE_MODULES_PATH, 'swiper/dist/js/swiper.min.js')
    ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: config.PUBLIC_PATH+'/', // 打包文件内用到的URL路径, 比如背景图等(可以设成http的地址, 比如: http://cdn.my.com)
    filename: '[name].[hash].js'
  },

  //enable dev source map
  devtool: 'eval-source-map',
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    host: config.host,
    port: config.port,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, loaders: ['babel'], include: APP_PATH
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url',
          'sass?sourceMap'
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
    // 解决如下错误
    // Warning: Failed prop type: Invalid prop `user` of type `object` supplied to `App`, expected `array`.
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    // new ExtractTextPlugin('app.css', {
    //   allChunks: true
    // }),

    //这个使用uglifyJs压缩你的js代码
    // new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('common.[hash].js', ['app', 'vendors']),
    new HtmlwebpackPlugin({
      title: config.name,
      public_path: config.PUBLIC_PATH + '/public/images',
      template: path.resolve(APP_PATH, 'views/index.html')
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery'
    })

  ]
}
