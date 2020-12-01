module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/week1/' : '/',
  parallel: false,
  configureWebpack: {
    externals: {
      moment: 'moment'
    }
  }
}
