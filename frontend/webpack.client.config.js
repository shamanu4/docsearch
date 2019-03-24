const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env, argv) => {
  const srcPath = path.resolve(__dirname, "src");
  const distPath = path.resolve(__dirname, "dist/client");
  const isDevMode = argv.mode !== "production";
  const isAnalyseMode = process.env.NODE_ENV === "analyse";
  const isHMRMode = process.env.NODE_ENV === "hmr";

  const cleanWebpackPlugin = new CleanWebpackPlugin(["dist/client"]);

  const htmlWebpackPlugin = new HTMLWebpackPlugin({
    template: `${srcPath}/client/index.html`,
    favicon: `${srcPath}/universal/assets/img/icons/favicon.ico`
  });

  const extractCssChunksPlugin = new ExtractCssChunksPlugin({
    filename: isDevMode ? "[name].[hash:8].css" : "[chunkhash:8].css",
    chunkFilename: isDevMode ? "[id].[hash:8].css" : "[chunkhash:8].css",
    cssModules: true
  });

  const plugins = [
    cleanWebpackPlugin,
    htmlWebpackPlugin,
    extractCssChunksPlugin
  ];

  const devServer = isHMRMode
    ? {
        historyApiFallback: true,
        hot: true,
        hotOnly: true,
        contentBase: distPath,
        publicPath: "/",
        watchOptions: {
          ignored: "/node_modules/"
        }
      }
    : {};

  if (isAnalyseMode) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (isHMRMode) {
    plugins.push(new webpack.NamedModulesPlugin());
  }

  return {
    context: srcPath,
    target: "web",

    entry: `${srcPath}/client/index.jsx`,

    output: {
      path: distPath,
      filename: isDevMode ? "[name].[hash:8].js" : "[chunkhash:8].js",
      chunkFilename: isDevMode ? "[id].[hash:8].js" : "[chunkhash:8].js",
      publicPath: isHMRMode ? "/" : "/assets/"
    },

    resolve: {
      modules: ["node_modules", "src/universal"],
      extensions: ["*", ".js", ".jsx", ".json"]
    },

    stats: "minimal",

    devtool: "source-map",

    optimization: {
      minimize: !isDevMode,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
            filename: isDevMode ? "[name].[hash:8].js" : "[chunkhash:8].js"
          }
        }
      }
    },

    plugins: plugins,

    devServer: devServer,

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            isHMRMode ? "style-loader" : ExtractCssChunksPlugin.loader,
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
          test: /\.css$/,
          use: [
            isHMRMode ? "style-loader" : ExtractCssChunksPlugin.loader,
            "css-loader"
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
    }
  };
};
