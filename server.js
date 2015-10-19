var express = require('express');
var app = express();
var ODataServer = require('simple-odata-server');
var MongoClient = require('mongodb').MongoClient;


MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
    var odataServer = new ODataServer()
        .model(require('./resources/people'))
        .onMongo(function(cb) {
            cb(err, db);
        });

    app.use('/odata', odataServer.handle.bind(odataServer));
    app.use(require('./resources/static'));
    app.listen(process.env.PORT || 3000, function() {
        console.log("Server running...")
    });
});



// var odata = require('node-odata');


// var server = odata('mongodb://localhost:27017/test');

// server.use(require('./resources/people'));
// server.use(require('./resources/results'));
// server.use(require('./resources/static'));



// server.listen(process.env.PORT || 3000, function(){console.log("Server running...")});