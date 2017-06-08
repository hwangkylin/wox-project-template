const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pxtorem = require('postcss-pxtorem');
const find = require('find');
const path = require('path');

var files = find.fileSync('./src/js/');
var entrys = {};
var entrysArr = [];
var re = /[\w\W]*src\/([\w\W]+)\.js$/;
for(var i=0;i<files.length;i++){
  if(/\.entry\.js$/.test(files[i]) ){
    var filei = files[i].replace(re,'$1');
    entrys[filei] = './' + files[i];
    entrysArr.push(filei);
  }
}
var config = {
  entry: entrys,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '//static.quimg.com/gtour/dist/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/common/common.js',
			chunks:entrysArr,
			minChunks: Math.ceil(entrysArr.length * 2 / 3)
		})
  ],
  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', '.web.js', '.js', '.json', '.jsx', '.less'],
    alias:{
      app:path.resolve(__dirname,'src/js'),
      style:path.resolve(__dirname,'src/styles')
    }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src/js'),
        loader: 'style!css!postcss?parser=postcss-less'
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src/styles'),
        loader: 'style!css!postcss?parser=postcss-less'
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/styles'),
        loader: 'style!css!postcss'
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'node_modules'),
        loader: 'style!css!postcss'
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url?limit=10000'
      }
    ]
  },
  postcss: function () {
    return [
      require('precss'),
      require('autoprefixer')
    ];
  }
};

for(var j = 0; j < entrysArr.length; j++) {
  var pathname = path.basename(entrysArr[j]).split('.')[0];
  var conf = {
		filename: pathname + '.html',
		template: 'tpl.html',
		inject: 'body',
    favicon: './src/favicon.ico',
    title: pathname,
    hash: false,
    minify: {
     removeComments: true,
     collapseWhitespace: false
    },
    chunks: [ 'common', entrysArr[j]]
  };
  config.plugins.push(new HtmlWebpackPlugin(conf));
}


module.exports = config;
