var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


function mongoDBAccess(name_) {
    var url = 'mongodb://localhost:27017/' + name_;
    var _this = this;

    _this.getPersonById = function(id_, callback_) {
        var getP = function(db, mongoCallback) {
            var cursor = db.collection('people').find({
                "_id": new ObjectId(id_)
            });
            cursor.toArray(function(err, array) {
                callback_(null, array[0]);
                mongoCallback();
            });
        };

        run(getP);
    };

    _this.addPerson = function(person_, callback_) {


        if (person_._id) {
            this.updatePerson(person_, callback_);
        }
        else {


            var insertPerson = function(db, mongoCallback) {
                db.collection('people').insertOne(
                    person_,
                    function(err, result) {
                        assert.equal(err, null);
                        callback_(null, result.ops[0]);
                        mongoCallback();
                    }
                );
            };

            run(insertPerson);
        }

    };

    _this.updatePerson = function(person_, callback_) {
        var updatePers = function(db, mongoCallback) {
            var objectId = new ObjectId(person_._id);
            person_._id = objectId;
            db.collection('people').replaceOne({
                    "_id": person_._id
                },
                person_,
                function(err, result) {
                    callback_(null, result.ops[0]);
                    mongoCallback();
                }
            );
        };

        run(updatePers);
    };

    _this.getAllPeople = function(callback_) {
        var getAll = function(db, mongoCallback) {
            var allCursor = db.collection('people').find();
            allCursor.toArray(function(err, people) {
                callback_(people);
                mongoCallback();
            });
        };

        run(getAll);
    };


    function run(function_) {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server.");

            function_(db, function() {
                db.close();
            });


        });
    }

};

module.exports = mongoDBAccess;
