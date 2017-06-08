import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
import px2rem from 'postcss-pxtorem';
const path = require('path');
const find = require('find');

let files = find.fileSync('./src/js/');
let entrys = {};
let entrysArr = [];
let confEntry = [];
let re = /[\w\W]*src([\w\W]+)\.js$/;
for(let i=0;i<files.length;i++){
  if(/\.entry\.js$/.test(files[i]) ){
    let filei = files[i].replace(re,'$1').replace('/js/page/','');
    entrys[filei] = ['./src/webpack-public-path',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true', `${__dirname}/${files[i]}` ];
    entrysArr.push(filei);
    let confe = 'src/' + files[i];
    confEntry.push(path.resolve(__dirname, confe));
  }
}
let config = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: true,
  entry: entrys,
  target: 'web',
  output: {
    path: `${__dirname}/src`,
    publicPath: '',
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', '.web.js', '.js', '.jsx', '.json', '.less'],
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
  postcss: ()=> [precss,autoprefixer]
};
//根据入口js文件生成对应的html文件
for(let j = 0; j < entrysArr.length; j++) {
  let pathname = path.basename(entrysArr[j]).split('.')[0];
  let conf = {
		filename: pathname + '.html',
		template: 'tpl.html',
		inject: 'body',
    favicon: './src/favicon.ico',
    title: pathname,
    hash: true,
    minify: {
     removeComments: true,
     collapseWhitespace: true
    },
    chunks: [ entrysArr[j] ]
  };
  config.plugins.push(new HtmlWebpackPlugin(conf));
}

export default config;
