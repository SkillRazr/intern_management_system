const path = require("path");

module.exports = {
  entry: {
    content: "./src/scripts/content.js",
    background: "./src/scripts/background.js",
  },
  output: {
    path: path.resolve(__dirname, "../extension"),
    filename: "[name].js",
  },
  mode: "production",
  module: {
    rules: [],
  },
  resolve: {
    extensions: [".js"],
  },
};
