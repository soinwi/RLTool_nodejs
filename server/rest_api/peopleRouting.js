var express = require("express");
var bodyParser = require("body-parser");



function PeopleRouting(dbObject_) {
    var _dbObject = dbObject_;

    this.routing = new express.Router();

    this.routing.get(
        '/',
        function(req, res) {
            _dbObject.getAllPeople(function(people_) {
                res.send(people_)
            });
        }
    );

    this.routing.get(
        '/:id',
        function(req, res) {
            _dbObject.getPersonById(
                req.params.id,
                function(err, person_) {
                    res.send(person_);
                }
            );
        });

    this.routing.post(
        '/',
        bodyParser.json(),
        function(req, res) {
            _dbObject.addPerson(req.body, function(err, person_) {
                if (err === null) {
                    res.send(person_);
                }
                else {
                    res.send(err);
                }
            })
        });

}

module.exports = PeopleRouting;