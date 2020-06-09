const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'window'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
        {
            test: /\.ts/,
            exclude: /(node_modules)/,
            use: {
              loader: "ts-loader"
            }
        }
    ]
  },
  devServer: {
    port: 9011,
    hot: true,
    publicPath: "/dist/"
  },
};

