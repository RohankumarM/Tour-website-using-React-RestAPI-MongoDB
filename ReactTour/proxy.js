const Bundler = require('parcel-bundler');
const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

const forward = ['/tours', '/login', '/logout','/tours/add','/tours/delete/:id'];
app.use(forward, proxy({
  target: 'http://localhost:3000'
}));
const bundler = new Bundler('./index.html');
app.use(bundler.middleware());
app.listen(1234);