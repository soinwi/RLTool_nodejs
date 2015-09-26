var express = require("express");
var sqlite3 = require("sqlite3");
var path = require("path");


function Routing(dbObject_) {

    this.routing = new express.Router();

    var file = path.join(__dirname, "../db/", "test.db");

    this.routing.get('/', function(req, res) {
        res.end("this is the api");
    });

    this.routing.get('/listAll', function(req, res) {
        var db = new sqlite3.Database(file, sqlite3.OPEN_READONLY);


        var entries = [];

        db.each("SELECT thing,ROWID from Stuff", function(err, row) {
            entries.push({
                'thing': row.thing,
                'id': row.rowid
            });


        }, function(err, num) {
            var jsonres = JSON.stringify(entries);
            res.end(jsonres);

            db.close();
        });


    });


    this.routing.get('/:id', function(req, res) {
        var db = new sqlite3.Database(file);

        var entry = [];


        var qry = db.prepare("SELECT thing,ROWID from Stuff where rowid=(?)");
        qry.get(req.params.id, function(err, row) {
            var entry = {
                'thing': row.thing,
                'id': row.rowid
            };

            res.end(JSON.stringify(entry));

        });


    });

};

module.exports = Routing;