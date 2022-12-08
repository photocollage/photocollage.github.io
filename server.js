const history = require('connect-history-api-fallback');
const express = require('express');
const compression = require('compression');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
app.all('*', (req, res, next) => {
  // 设置请求头为允许跨域
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use((req, res, next) => {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.get('host')}${req.url}`);
  } else {
    next();
  }
});
app.use(history());
app.use(compression());
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`server started ${port}`);
