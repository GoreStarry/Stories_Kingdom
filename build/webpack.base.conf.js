var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, 'build');
const extractCSS = new ExtractTextPlugin(`${BUILD_DIR}/styles.css`);

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'server': path.resolve(__dirname, '../server'),
      'config': path.resolve(__dirname, '../config'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    exprContextCritical: false,
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.jsx?$/,
        loader: "babel",
        include: [
          path.join(projectRoot, 'src'),
          path.join(projectRoot, 'server')
        ],
        exclude: /node_modules/,
      }, {
        test: /(LICENSE|\.md)$/,
        loader: 'null'
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel',
      //   include: [
      //     path.join(projectRoot, 'src'),
      //     path.join(projectRoot, 'server')
      //   ],
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.scss$/,
      //   loaders: ["style", "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]", "sass"],
      // },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: useCssSourceMap
    }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  // node: {
  //   fs: "empty",
  //   dns: "empty",
  //   tls: "empty",
  //   module: "empty",
  //   net: "empty"
  // },
  plugins: [
    extractCSS,
  ],
}
