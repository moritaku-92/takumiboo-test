var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('../webpack/dev.config')
var bodyParser = require('body-parser')

var path = require('path')
var app = new(require('express'))()
var port = 3001

// クロスドメイン許可設定
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
}
app.use(allowCrossDomain);

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

// POSTによる値の取得の設定
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

var express = require('express');
app.use(express.static('public'))

// Paramテスト用HTML
app.get("/test", function (req, res) {
  res.sendFile(path.resolve(__dirname, '../test.html'))
})
// get通信
app.get("/getData", function (req, res) {
  console.log("アクセスしたで")
  res.sendFile(path.resolve(__dirname, '../res_file/test.json'))
})

// /test /param 以外のURLは全てここへ
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, '../index.html'))
})



app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})