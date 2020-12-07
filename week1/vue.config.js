module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/F2E-Challenge2019/week1/' : '/',
  parallel: false,
  configureWebpack: {
    externals: {
      moment: 'moment'
    }
  }
}
