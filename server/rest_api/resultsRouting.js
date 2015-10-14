var express = require("express");
var bodyParser = require("body-parser");

function ResultsRouting(dbObject_) {
    var _this = this;
    var _dbObject = dbObject_;

    _this.routing = new express.Router();

    _this.routing.get(
        '/',
        function(req, res) {
            _dbObject.getAllResults(function(results_) {
                res.send(results_);
            });
        });

    _this.routing.get(
        '/:id',
        function(req, res) {
            _dbObject.getResultById(
                req.params.id,
                function(err, result_) {
                    if (err === null) {
                        res.send(result_);
                    }
                    else {
                        
                        res.send(err);
                    }

                });
        });

    _this.routing.get(
        '/byPersonId/:personId',
        function(req, res) {
            _dbObject.getResultsByPersonId(req.params.personId,
                function(err, results_) {
                    if (err === null) {
                        res.send(results_);
                    }
                    else {
                        res.send(err);
                    }
                });
        });

    _this.routing.post(
        '/',
        bodyParser.json(),
        function(req, res) {
            _dbObject.addResult(req.body, function(err, result) {
                if (err === null) {
                    res.send(result);
                }
                else {
                    res.send(err);
                }
            });
        });

}

module.exports = ResultsRouting;