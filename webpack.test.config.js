const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

// Since webpack.test.config.js is used by command line, save it as a separate file.
const scssLoader = [
  'style-loader',
  {
    loader: 'css-loader?minimize',
    options: {
      sourcemap: true
    }
  },
  {
    loader: 'postcss-loader'
  },
  {
    loader: 'sass-loader',
    options: {
      sourcemap: true
    }
  }
]

module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  plugins: [
    new webpack.DefinePlugin({
      ENV: '"test"',
      'process.env': {
        NODE_ENV: JSON.stringify('test'),
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?sourceMap&-minimize'
        ]
      },
      {
        test: /\.scss$/,
        use: scssLoader,
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
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
    ]
  },
};
