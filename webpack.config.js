
require('webpack');
const path = require('path');

const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
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
          presets: ['react', 'env', 'stage-2']
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
      }, 
      {
        test: /\.css$/,
        include: /node_modules/,
        loader:  'style-loader!css-loader'
    } ,
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.less', '.css']
  },
}
