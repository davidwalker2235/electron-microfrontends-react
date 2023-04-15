const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { inDev } = require('./webpack.helpers');
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');

module.exports = [
    new ModuleFederationPlugin({
        name: "dashboard",
        filename: "remoteEntry.js",
        remotes: {
            'microfr': 'microfr@http://localhost:8080/remoteEntry.js'
        },
        shared: {},
        exposes: {},
    }),
  new ForkTsCheckerWebpackPlugin(),
    new ExternalTemplateRemotesPlugin(),
  inDev() && new webpack.HotModuleReplacementPlugin(),
  inDev() && new ReactRefreshWebpackPlugin(),
].filter(Boolean);
