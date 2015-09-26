var sqlite3 = require("sqlite3");
var file = require("fs");
var path = require("path");
var Person = require(path.join(__dirname, "../model/person"));

function dbAccess(name_)
{
    var _this = this;
    var _dbFileName = name_;
    
    function getDB()
    {
        var exists = file.existsSync(_dbFileName);
        
        var db = new sqlite3.Database(_dbFileName);
        
        if(!exists)
        {
            db.serialize(function(){
               initDB(db);
            });
            db = new sqlite3.Database(_dbFileName);
            return db;
        }
        else
        {
            return db;
        }
    };
    
    function initDB(db_)
    {
        db_.run("CREATE TABLE People (firstname TEXT, lastname TEXT, birthDate TEXT)", 
        function(err,success)
        {
            if(err !== null)
            {
                console.log("error creating table");
            }
        });
        db_.close();
    };
    
    this.getAllPeople = function(callback_)
    {
        var db = getDB();
        var people = [];
        db.each(
            "SELECT ROWID as rowid, firstname as fname, lastname as lname, birthDate as bdate from People",
            function(err,row)
            {
                if(row !== null)
                {
                    var person = new Person();
                    person.firstName = row.fname;
                    person.lastName = row.lname;
                    person.id = row.rowid;
                    person.birthDate = new Date(row.bdate);
                    
                    people.push(person);
                    
                }
            },
            function(err, num)
            {
                db.close();
                callback_(people);
            });
            
    };
    
    
    
    this.updatePerson = function(person_, callback_)
    {
        var db = getDB();
        var query = db.prepare("")
    };
    
    this.getPersonById = function(personId_, callback_)
    {
        var db = getDB();
        var query = db.prepare("SELECT firstName as fn, lastName as ln, birthDate as bd, ROWID as id from People where ROWID = ?");
        query.get(
            personId_, 
            function(err,row){
                if(err === null)
                {
                    var person = new Person();
                    person.firstName = row.fn;
                    person.lastName = row.ln;
                    person.birthDate = new Date(row.bd);
                    person.id = row.id;
                    
                    callback_(null, person);
                }
                else
                {
                    callback_(err, null);
                }
            }
        );
        
    };
    
    this.addPerson = function(person_, callback_)
    {
        if(person_.id != -1)
        {
            this.updatePerson(person_, callback_);
            return;
        }
        
        var db = getDB();
        var query = db.prepare("INSERT INTO People (firstName, lastName, birthDate) VALUES (?,?,?)");
        query.run(person_.firstName, person_.lastName, person_.birthDate.toDateString(),
            function(err)
            {
                if(err===null)
                {
                    var result = this;
                    _this.getPersonById(this.lastID, callback_);
                }
                else
                {
                    callback_(err, null);
                }
                
            }
        );
        
    };
    
};

module.exports = dbAccess;