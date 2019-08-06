/* const path = require('path'); */

module.exports = {
  entry: ['./src/scripts/index.js'],
  output: {
    /* path: path.resolve(__dirname, './public/scripts'), */
    filename: 'boundle.js'
  },
  module: {
    rules: [{ 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader"
      }]
  },
  mode: "development",
  devtool: "eval-source-map"
};