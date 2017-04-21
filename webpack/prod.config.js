var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../index'),
  ],
  output: {
    path: path.join(__dirname, '../assets/'),
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: ''
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'babel' ],
      },
      {
        test: /\.css$/,
        loaders: [ 'style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  postcss: function () {
        return [require('autoprefixer'), require('precss')];
  },
  eslint: {
    configFile: './.eslintrc'
  }
}
