// ------------------------------------
// Webpack Config For Version 3.x
// ------------------------------------

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const path = require('path')
const _ = require('lodash')
const pkg = require('./package.json')

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const scssLoader = [
  {
    loader: 'css-loader?minimize',
    options: {
      sourcemap: true
    }
  },
  {
    loader: 'postcss-loader',
  },
  {
    loader: 'sass-loader',
    options: {
      sourcemap: true
    }
  }
]
if (isDev) {
  _.find(scssLoader, { loader: 'postcss-loader' }).options = {
    autoprefixer : {
      add      : true,
      remove   : true,
      browsers : ['last 2 versions']
    }
  }
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  cache: true,
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: ''
  },
  plugins: _.compact([
    new webpack.DllReferencePlugin({
      context: __dirname,
			manifest: require('./dll/manifest.json')
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    isProd && new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false
      },
    }),
    new HtmlWebpackPlugin({
      title    : pkg.name,
      vendor   : {
        entry : `<script type\=\"text/javascript\" src\=\"${require('./dll/manifest.json').name}.js\"><\/script>`,
        css   : `<link href\=\"${require('./dll/manifest.json').name}.css\" rel\=\"stylesheet\">`
      },
      template : path.resolve(__dirname, 'src/index.html'),
      hash     : false,
      favicon  : path.resolve(__dirname, 'public/favicon.ico'),
      filename : 'index.html',
      inject   : false,
      hash     : true,
      minify   : {
        collapseWhitespace : false
      }
    }),
    isDev && new webpack.HotModuleReplacementPlugin(),
    isProd && new webpack.optimize.AggressiveMergingPlugin(),
    new LodashModuleReplacementPlugin({
      'shorthands'  : true,
      'collections' : true,
    }),
  ]),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true'
      },
      {
        test : /\.json$/,
        use : [
          'json-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap&-minimize'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: scssLoader,
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]?[hash]'
        }
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]'
        }
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9000
  }
}
