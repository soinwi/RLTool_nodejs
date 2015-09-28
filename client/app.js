var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

var PersonModel = require("./PersonModel");
var PeopleCollection = require("./PeopleCollection");
var PeopleView = require("./PeopleView");
var PersonView = require("./PersonView");

Backbone.$ = $;


document.writeln("hello world!");

console.log("another blabla (again)...");

var pc = new PeopleCollection();

pc.bind('reset', function(){
    console.log( "reset: "); 
    console.log(pc); 
    
    var pv = new PersonView({model: pc.last()});
    pv.render();
    
    
var pw = new PeopleView({collection: pc});
pw.render();

});
pc.fetch({success: function(coll,response,options){
    console.log("fetch finished");
    console.log("collection: " + JSON.stringify(coll));
    console.log("response: " + JSON.stringify(response));
    console.log("options: " + JSON.stringify(options));
    
}, reset: true, error: function() { console.log("error"); console.log(arguments); }});




