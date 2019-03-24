const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");

const srcPath = path.resolve(__dirname, "src");
const distPath = path.resolve(__dirname, "dist/server");

const cleanWebpackPlugin = new CleanWebpackPlugin(["dist/server"]);

const extractCssChunksPlugin = new ExtractCssChunksPlugin({
  filename: "server.css",
  chunkFilename: "server.[id].css",
  cssModules: true
});

const limitChunkCountPlugin = new webpack.optimize.LimitChunkCountPlugin({
  maxChunks: 1
});

module.exports = {
  context: srcPath,
  target: "node",

  entry: {
    server: `${srcPath}/server/index.js`
  },

  output: {
    path: distPath,
    filename: "server.js",
    publicPath: "/assets/",
    chunkFilename: "server.[id].js"
  },

  node: {
    __dirname: false,
    __filename: false
  },

  resolve: {
    modules: ["node_modules", "src/universal"],
    extensions: ["*", ".js", ".jsx", ".json"]
  },

  stats: "minimal",

  devtool: "source-map",

  optimization: {
    minimize: true
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  node: 11
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          ExtractCssChunksPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              camelCase: true,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          },
          { loader: "postcss-loader" },
          {
            loader: "sass-loader",
            options: {
              data: '@import "vars"; @import "mixins"; @import "utils";',
              includePaths: ["./src/universal/assets/sass"]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2|pdf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: "file-loader"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-react-loader"
      },
      {
        test: /\.(txt|md)$/,
        use: "raw-loader"
      }
    ]
  },

  externals: [nodeExternals()],

  plugins: [cleanWebpackPlugin, extractCssChunksPlugin, limitChunkCountPlugin]
};
