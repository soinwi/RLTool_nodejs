var path = require("path");
var dbaccess = require(path.join(__dirname,"../db/dbAccess"));
var person = require(path.join(__dirname, "../model/person"));
var Result = require(path.join(__dirname, "../model/result"));

var dba = new dbaccess(path.join(__dirname, "testsDB.sqlite3"));

/*dba.publicGetDB(function(db){
   console.log("Got db!");
   
    
});*/

dba.getAllPeople(function(people)
{
    var strPeo = JSON.stringify(people);
    console.log(strPeo);
});

var newperson = new person();
newperson.firstName = "David";
newperson.lastName = "Sommer";
newperson.birthDate = new Date("1990-12-30");
console.log(newperson.birthDate.toDateString());
dba.addPerson(newperson, function(err,person)
{
    var strPer = JSON.stringify(person);
    console.log(strPer);
    
    var sr = new Result();
    sr.personId = person.id;
    sr.result = 13.37;
    sr.description = "additional, optional description";
    
    dba.addResult(sr, function(err, res){
        console.log(JSON.stringify(res));
    });
});

