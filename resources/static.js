
var express = require('express');
var path = require('path');

//router.get('/static/', express.static(path.resolve(__dirname, '../client')));
var router = express.static('client');

//router.get('/index.js', express.static(path.resolve(__dirname, '../client/index.js')));

module.exports = router;