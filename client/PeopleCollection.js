var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");
var PersonModel = require("./PersonModel")
Backbone.$ = $;

var PeopleCollection = Backbone.Collection.extend({
   model: PersonModel,
   url: '/people',
   /*parse: function(resp){
      return this.fromResponse(resp); 
   },*/
   
   fromResponse: function(resp)
   {
      var coll = [];
      for(var i = 0;i<resp.length; i++)
      {
         var nm = new PersonModel();
         nm.fromResponse(resp[i]);
         coll.push(nm);
      }
      return coll;
   }
    
});

module.exports = PeopleCollection;