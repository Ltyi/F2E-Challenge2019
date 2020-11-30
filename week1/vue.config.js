const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  configureWebpack: {
    externals: {
      moment: 'moment'
    },
    plugins: [new BundleAnalyzerPlugin()]
  }
}
