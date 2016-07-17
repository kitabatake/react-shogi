var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: './index.jsx',
    vendor: ['react', 'react-dom']
  },
  output: { path: __dirname + '/public/', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ],
  devServer: {
    contentBase: 'public'
  }
}