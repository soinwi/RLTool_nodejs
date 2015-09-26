var path = require("path");
var dbaccess = require(path.join(__dirname,"../db/dbAccess"));
var person = require(path.join(__dirname, "../model/person"));

var dba = new dbaccess(path.join(__dirname, "testsDB.sqlite3"));

dba.getAllPeople(function(people)
{
    var strPeo = JSON.stringify(people);
    console.log(strPeo);
});

var newperson = new person();
newperson.firstName = "David";
newperson.lastName = "Sommer";
newperson.birthDate = new Date(1990,11,30).toDateString();
console.log(newperson.birthDate.toDateString());
dba.addPerson(newperson, function(err,person)
{
    var strPer = JSON.stringify(person);
    console.log(strPer);
});