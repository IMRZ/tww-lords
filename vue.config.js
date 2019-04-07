module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  css: {
    extract: false
  },
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: Infinity }));
  }
};
