const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("styles", resolve("src/common/styles"))
      .set("stylus", resolve("src/common/styles/stylus"))
      .set("common", resolve("src/common"))
      .set("com", resolve("src/components"));
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/mock"
        }
      }
    }
  }
};
