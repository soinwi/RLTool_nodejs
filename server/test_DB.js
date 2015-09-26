var fs = require("fs");
var express = require("express");
var routing = require('./routing');

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


var app = express();

app.use('/api', routing);


app.get('/test', function(req, res){
    res.end("hello, world");

});

var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("REST server listening at", addr.address + ":" + addr.port);
});