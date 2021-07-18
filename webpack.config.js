const path = require('path'); // add this for path context in loader

module.exports = {
entry: './scripts/income/Tally.js',
output: {
filename: 'bundle.js',
path: __dirname + '/dist/',
    },
module: { // new concept, loaders
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('./scripts/income/Tally.js'), // file to transpile
        loader: 'babel-loader', // loaders referenced
        exclude: /node_modules/, // we do not need to transpile other libraries
        options: require('./.babelrc'), // reference to babel rules
      }
    ]
  },

}
