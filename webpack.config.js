const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './web/source.js',
  output: {
    path: path.resolve(__dirname, 'styles'),
    filename: '[name][fullhash].js',
  },
  plugins: [new MiniCssExtractPlugin({
    filename: '[name][fullhash].css',
  })],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader",{
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: ['node_modules'],
            }
          }
        }],
      },
    ],
  },
};