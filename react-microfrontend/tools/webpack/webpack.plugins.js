const webpack = require('webpack');
const { inDev } = require('./webpack.helpers');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = [
  new ModuleFederationPlugin({
    name: "microfr",
    filename: "remoteEntry.js",
    remotes: {},
    exposes: {
      './Application': './src/components/Application',
    },
    shared: { react: {
        eager: true,
        singleton: true,
        requiredVersion: '^18.2.0'
      }, "react-dom": {
        eager: true,
        singleton: true,
        requiredVersion: '^18.2.0'
    } },
  }),
  new ForkTsCheckerWebpackPlugin(),
  inDev() && new webpack.HotModuleReplacementPlugin(),
  inDev() && new ReactRefreshWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    favicon: 'assets/images/logo.png',
    inject: true,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[chunkhash].css',
    chunkFilename: '[name].[chunkhash].chunk.css',
  }),
].filter(Boolean);
