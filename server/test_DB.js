var fs = require("fs");
var express = require("express");
var routing = require('./rest_api/routing');
var peopleRouting = require("./rest_api/peopleRouting");
var resultsRouting = require("./rest_api/resultsRouting");
var dbAccess = require("./db/dbAccess");

var app = express();


var dbaccess = new dbAccess("testsDB.sqlite3");
app.use('/prototype', new routing({'abc':'def'}).routing);
app.use('/people', new peopleRouting(dbaccess).routing);
app.use('/results', new resultsRouting(dbaccess).routing);


app.get('/test', function(req, res){
    res.end("hello, world");

});

var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("REST server listening at", addr.address + ":" + addr.port);
});






/*var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();

function init(){
    var db = new sqlite3.Database(file);
    
    db.serialize(function(){
       if(!exists)
       {
           db.run("CREATE TABLE Stuff (thing TEXT)");
       }
       var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");
      
        //Insert random data
    //   var rnd;
    //   for (var i = 0; i < 10; i++) {
    //     rnd = Math.floor(Math.random() * 10000000);
    //     stmt.run("Thing #" + rnd);
    //   }
      
    stmt.finalize();
        
    });
    db.close();
}

init();*/