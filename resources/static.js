var func = require('node-odata').Function;
var express = require('express');
var path = require('path');

var router = func();

//router.get('/static/', express.static(path.resolve(__dirname, '../client')));
router = express.static('client');

//router.get('/index.js', express.static(path.resolve(__dirname, '../client/index.js')));

module.exports = router;