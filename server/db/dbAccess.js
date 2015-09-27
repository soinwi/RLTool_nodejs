var sqlite3 = require("sqlite3").verbose();
var file = require("fs");
var path = require("path");
var Person = require(path.join(__dirname, "../model/person"));
var Result = require(path.join(__dirname, "../model/result"));

function dbAccess(name_) {
    var _this = this;
    var _dbFileName = name_;

    var _exists = file.existsSync(_dbFileName);

    function getDB(callback_) {

        var db = new sqlite3.Database(_dbFileName);

        if (!_exists) {

            initDB(db, callback_);

        }
        else {
            callback_(db);
        }
    }

    function initDB(db_, callback_) {

        var errorFunc = function(err) {
            if (err !== null) {
                console.log("error creating table " + err);
            }
        };
        db_.serialize(function() {
            db_.run("CREATE TABLE IF NOT EXISTS People (firstname TEXT, lastname TEXT, birthDate TEXT);",
                errorFunc);
            db_.run("CREATE TABLE IF NOT EXISTS Results (personId INTEGER, result REAL, description TEXT, " +
                "FOREIGN KEY (personId) REFERENCES People (ROWID));",
                function(err) {
                    errorFunc(err);
                    _exists = true;
                    callback_(db_);
                });
        });

    };

    this.getAllPeople = function(callback_) {
        getDB(function(db) {
            var people = [];
            db.each(
                "SELECT ROWID as rowid, firstname as fname, lastname as lname, birthDate as bdate from People",
                function(err, row) {
                    if (row !== null) {
                        var person = new Person();
                        person.firstName = row.fname;
                        person.lastName = row.lname;
                        person.id = row.rowid;
                        person.birthDate = new Date(row.bdate);

                        people.push(person);

                    }
                },
                function(err, num) {
                    callback_(people);
                });

            condClose(db);
        });

    };



    this.updatePerson = function(person_, callback_) {
        getDB(function(db) {
            var query = db.prepare("UPDATE People SET firstName = ?, lastName = ?, birthDate = ? WHERE ROWID = ?");

            query.run(person_.firstName, person_.lastName, person_.birthDate, person_.id,
                function(err) {
                    if (err === null) {
                        _this.getPersonById(person_.id, callback_, db);
                    }
                    else {
                        callback_(err);
                    }
                });
            query.finalize();
            condClose(db);
        });
    };

    this.getPersonById = function(personId_, callback_, db_) {
        if (db_ === null || db_ === undefined) {
            getDB(exec);
        }
        else {
            exec(db_);
        }

        function exec(db_) {
            var query = db_.prepare("SELECT firstName as fn, lastName as ln, birthDate as bd, ROWID as id from People where ROWID = ?");
            query.get(
                personId_,
                function(err, row) {
                    if (err === null && row != undefined) {
                        var person = new Person();
                        person.firstName = row.fn;
                        person.lastName = row.ln;
                        person.birthDate = new Date(row.bd);
                        person.id = row.id;


                        callback_(null, person);

                    }
                    else {

                        callback_(err, null);
                    }
                }
            );
            query.finalize();
            condClose(db_);
        }

    };

    this.addPerson = function(person_, callback_, db_) {
        if (person_.id != -1) {
            this.updatePerson(person_, callback_);
            return;
        }

        if (db_ === null || db_ === undefined) {
            getDB(exec);
        }
        else {
            exec(db_);
        }

        function exec(db_) {
            var query = db_.prepare("INSERT INTO People (firstName, lastName, birthDate) VALUES (?,?,?)");
            query.run(person_.firstName, person_.lastName, person_.birthDate,
                function(err) {
                    if (err === null) {
                        var result = this;
                        _this.getPersonById(this.lastID, callback_, db_);
                    }
                    else {
                        callback_(err, null);
                    }

                }
            );
            query.finalize();
            condClose(db_);
        }
    };



    this.addResult = function(result_, callback_, db_) {
        if (result_.id != -1) {
            this.updateResult(result_, callback_, db_);
            return;
        }

        if (db_ === null || db_ === undefined) {
            getDB(exec);
        }
        else {
            exec(db_);
        }

        function exec(db_) {
            var query = db_.prepare("INSERT INTO Results (personId, result, description) VALUES (?, ?, ?)");
            query.run(result_.personId, result_.result, result_.description,
                function(err) {
                    if (err === null) {
                        var result = this;
                        _this.getResultById(this.lastID, callback_, db_);
                    }
                    else {
                        callback_(err, null);
                    }
                });
            query.finalize();
            condClose(db_);
        }


    };

    this.updateResult = function(result_, callback_, db_) {
        if (db_ === null || db_ === undefined) {
            getDB(exec);
        }
        else {
            exec(db_);
        }

        function exec(db_) {
            var query = db_.prepare("UPDATE Results SET personId = ?, result = ?, description = ? WHERE ROWID = ?");
            query.run(result_.personId, result_.result, result_.description, result_.id,
                function(err) {
                    if (err === null) {
                        _this.getResultById(result_.id, callback_, db_);
                    }
                    else {
                        callback_(err);
                    }
                });
            query.finalize();
            condClose(db_);
        }
    };

    this.getResultById = function(resultId_, callback_, db_) {
        if (db_ === null || db_ === undefined) {
            getDB(exec);
        }
        else {
            exec(db_);
        }

        function exec(db_) {
            var query = db_.prepare("SELECT personId as pid, result as r, description as desc, ROWID as id from Results where ROWID = ?");
            query.get(
                resultId_,
                function(err, row) {
                    if (err === null && row != undefined) {
                        var result = new Result();
                        result.personId = row.pid;
                        result.result = row.r;
                        result.description = row.desc;
                        result.id = row.id;


                        callback_(null, result);

                    }
                    else {

                        callback_(err, null);
                    }
                }
            );
            query.finalize();
            condClose(db_);
        }
    };

    this.getAllResults = function(callback_, db_) {
        if (db_ === null || db_ === undefined) {
            getDB(exec);
        }
        else {
            exec(db_);
        }

        function exec(db_) {
            var results = [];
            db_.each("SELECT ROWID as id, personId as pid, result as r, description as desc FROM Results",
                function(err, row) {
                    if (err === null) {
                        var res = new Result();
                        res.id = row.id;
                        res.personId = row.pid;
                        res.result = row.r;
                        res.description = row.desc;
                        results.push(res);
                    }
                },
                function(err, num) {
                    callback_(results);
                });
        }
    }

    this.getResultsByPersonId = function(personId_, callback_, db_) {
        if (db_ === null || db_ === undefined) {
            getDB(exec);
        }
        else {
            exec(db_);
        }

        function exec(db_) {
            var results = [];
            var query = db_.prepare("SELECT ROWID as id, personId as pid, result as r, description as desc FROM Results WHERE personId=?");
            query.each(personId_,
                function(err, row) {
                    if (err === null && row !== undefined) {
                        var r = new Result();
                        r.personId = row.pid;
                        r.result = row.r;
                        r.id = row.id;
                        r.description = row.desc;
                        results.push(r);
                    }
                },
                function(err, num) {
                    callback_(results);
                });
            query.finalize();
            condClose(db_);
        }
    };

    function condClose(db_) {
        if (db_.open) {
            db_.close();
        }
    }

};

module.exports = dbAccess;