const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const buildPath = path.resolve(__dirname, 'www');

const config = {
  entry: './index.jsx',
  // Render source-map file for final build
  //devtool: 'source-map',
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: 'bundle.js' // Name of output file
  },
  plugins: [
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    }),

    new webpack.NoErrorsPlugin(),

    new TransferWebpackPlugin([
      {from: 'www',to: '/'},
    ]),

    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    })
  ],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        test : /\.jsx?/,
        loaders :['react-hot-loader/webpack', 'babel-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
        exclude: '/node_modules/'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.(ico|jpg|jpeg|png|gif)$/i,
        loaders: ['file-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }//,
      // {
      //   test: /\.jsx?$/,
      //   includes: [path.join(__dirname, '')],
      //   loader: 'babel-loader',
      //   query: {
      //       presets: ['es2015', 'react']
      //   },
      //   excludes:
      // },
      // {
      //   		test : /\.jsx?/,
      //   		loaders :['babel-loader'],
      //       exclude:  /(node_modules|plugins|platforms|hooks|node_server)/
      //     },
    ]
  }
};

module.exports = config;