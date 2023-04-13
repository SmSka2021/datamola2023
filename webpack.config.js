const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/img'),
          to: path.resolve(__dirname, 'dist/assets/img'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/icon'),
          to: path.resolve(__dirname, 'dist/assets/icon'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/fonts'),
          to: path.resolve(__dirname, 'dist/assets/fonts'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.html$/, use: [{ loader: 'html-loader' }] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
      // { test: /\.(png|svg|jpg|gif)$/i,  use: ['file-loader']},
      // { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
      { test: /\.svg$/, use: 'svg-inline-loader' },
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, type: 'asset/resource' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.css'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'dist/assets/img/[name].[ext]',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
  devtool: 'inline-source-map',
  mode: 'development',
};
