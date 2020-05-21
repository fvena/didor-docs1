// const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const utils = require('./utils');

module.exports = {
  // entry: path.join(process.cwd(), './node_modules/@didor/docs/lib/src/demo.js'),
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]'),
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
          },
        },
      },
    ],
  },
  resolveLoader: {
    modules: [path.join(process.cwd(), './node_modules/@didor/docs/node_modules')],
  },
  resolve: {
    alias: {
      vue$: path.join(process.cwd(), './node_modules/@didor/docs/node_modules/vue/dist/vue.common'),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: utils.resolve("static/img"),
    //     to: utils.resolve("dist/static/img"),
    //     toType: "dir"
    //   }
    // ])
  ],
  node: {
    fs: 'empty',
  },
  performance: { hints: false },
};
