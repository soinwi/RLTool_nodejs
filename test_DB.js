var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);

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

init();

var express = require("express");
var app = express();

app.get('/listAll', function(req, res){
    var db = new sqlite3.Database(file, sqlite3.OPEN_READONLY);
    
    
    var entries = [];
    
    db.each("SELECT thing,ROWID from Stuff", function(err,row){
        entries.push({
            'thing':row.thing,
            'id':row.rowid
        });
        
        
    }, function(err, num){
        var jsonres = JSON.stringify(entries);
        res.end(jsonres);
    
        db.close();
    });
    
    
});


app.get('/:id', function(req,res){
   var db = new sqlite3.Database(file);
   
   var entry =[];
   
   
   var qry = db.prepare("SELECT thing,ROWID from Stuff where rowid=(?)");
   qry.get(req.params.id, function(err,row){
       var entry = {'thing':row.thing, 'id':row.rowid};
       
       res.end(JSON.stringify(entry));
       
   });
   
    
});

var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("REST server listening at", addr.address + ":" + addr.port);
});