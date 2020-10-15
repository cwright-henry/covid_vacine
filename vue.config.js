module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/covid-vacine/' : '/',
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      "/covid/api": {
        target: `http://localhost:3000/`
      }
    }
  }
}