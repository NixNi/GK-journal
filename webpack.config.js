const path = require('path');

module.exports = {
  mode: 'production',
  entry: './scripts/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.bundle.js'
  }
};