const path = require("path");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // Where to look for our entry file to bundle it
  // This syntax is used for code splitting if there's need to bundle into different files and lazy load them to decrease load time
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    // Where to output bundled file that browser can understand and execute
    // Output it to dist folder
    path: path.resolve(__dirname, "dist"),
    // Name it bundle.js or whatever the name of entry is and append the caching mechanism
    filename: "[name].[contenthash].js",
    // If something changes in the code and new name with new hash is outputed we want to delete the old bundle.js
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  // Configuration of loaders
  module: {
    rules: [
      // Rule for files ending in .scss (Sass loader)
      {
        test: /\.scss$/,
        // The order of loader usage is important
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // Rule for files ending in .js to transpile JavaScript code to backwards compatile .js files to support older browsers
      {
        test: /\.js$/,
        // We don't want to mess with code inside node_modules
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Rule to add loader for image files so that we can import images and use them inside .js files
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/i,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    // Plugin that automatically creates an entry index.html file in dist folder with imported js files that were bundled with webpack
    new HtmlWebpackPlugin({
      // Title override inside head tag
      title: "Try Not To Laugh",
      filename: "index.html",
      // Defining custom template that will be used for generating dist/index.html
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],

  // Everything above this point is mostly used for compiling the code inside dist folder which is used in production environment
  // This segment below describes dev server that developers use to quickly develop and view the applcation
  devServer: {
    // Where to find entry point for static directory that will be uploaded to memory and used in dev server
    // When dev server starts it doesn't create or need dist folder, but instead uses configuration from above to create and load bundled modules inside memory and expose it on a port
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    // Compression is on
    compress: true,
    // When npm script is ran we want the post to open automatically
    open: true,
    // Enable Hot Module Replacement
    hot: true,
  },
};
