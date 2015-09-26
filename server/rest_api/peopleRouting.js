var express = require("express");
var sqlite3 = require("sqlite3");
var path = require("path");


function PeopleRouting(dbObject_) {
    var _dbObject = dbObject_;
    
    this.routing = new express.Router();
 
    this.routing.get(
        '/listAll',
        function(req,res)
        {
            _dbObject.getAllPeople(function(people_){res.send(people_)});
        }
    );
    
}

module.exports = PeopleRouting;