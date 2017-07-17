/* @flow */

const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

const modulePath = path.join(__dirname, 'node_modules');

module.exports = {
  entry: {
    bundle: ['./example/index.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /.jsx?/,
      exclude: /node_modules/,
      use: [{
        loader: path.join(modulePath, 'babel-loader'),
      }],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devtool: 'inline-sourcemap',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
  },
  plugins: [
    new HTMLPlugin({ template: path.join(__dirname, 'src', 'index.html') }),
  ],
};

if (process.env.NODE_ENV === 'development') {
  module.exports.entry.bundle.unshift(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  );
  module.exports.devtool = 'inline-source-map';
  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  );
}
