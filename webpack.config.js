const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/pages/index.js',
    dns: './src/js/pages/dns.js',
    demo: './src/js/pages/demo.js',
    state: './src/js/pages/state.js',
    functional: './src/js/pages/functional.js',
    test: './src/js/pages/test.js',
    stereogram: './src/js/pages/stereogram.js',
    encode: './src/js/pages/encode.js',
    transducers: './src/js/pages/transducers.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "static" },
      ],
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(html)$/,
        use: [
          "file-loader?name=[name].[ext]",
          {
            loader: "extract-loader",
            options: {
              publicPath: "",
            }
          },
          "html-loader",
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};