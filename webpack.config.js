const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: './src/js/pages/index.js',
    functional: './src/js/pages/functional.js',
    state: './src/js/pages/state.js',
    stereogram: './src/js/pages/stereogram.js',
    test: './src/js/pages/test.js',
    demo: './src/js/pages/demo.js',
  },
  output: {
    filename: 'build-[name].js',
  },
  module: {
		rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
			{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
			}
		]
	},
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};