const path = require('path');
const webpack = require('webpack');
const VersionFile = require('webpack-version-file');
const buildPath = path.resolve(__dirname, 'www');
var curre = path.resolve(__dirname, 'src');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    './index.jsx'
  ],
  output: {
    path: buildPath, // Path of output file
    filename: 'bundle.js',
  },

  devServer: {
    contentBase: 'www', // Relative directory for base of server
    hot: true, // Live-reload
    inline: false,
    port: 3333, // Port Number
    host: '0.0.0.0', // Change to '0.0.0.0' for external facing server
  },
  devtool: 'eval-source-map',
  resolve: {
        extensions: ['.js', '.webpack.js', '.web.js'],//'',
  },
  plugins: [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    new VersionFile({
          output: 'www/version/version.json',
          package: './package.json',
          data: {
              date: new Date()
          },
          //templateString: '<%= name %>@test<%= version %>\nBuild test date: <%= git %>'
          template: 'version/version.ejs'
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
    ]//,
    //excludes:  /(node_modules|hooks)/
  }
};
