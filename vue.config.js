module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/covid-vaccine/' : '/',
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