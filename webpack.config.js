
var webpack = require('webpack');
var path = require('path');
var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
}
