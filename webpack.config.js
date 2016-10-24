var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/pipe_dream.js",
  output: {
    path: "./lib",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {test: [/\.jsx?$/, /\.js?$/],
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
