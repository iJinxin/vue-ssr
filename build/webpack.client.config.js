const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: './src/entry-client.js',
  plugins: [
    new VueSSRClientPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../src/index.template.html'),
    //   filename: 'index.html'
    // })
  ]
})