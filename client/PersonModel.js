var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");
Backbone.$ = $;

var PersonModel = Backbone.Model.extend({
    
   initialize: function(){
       
       this.on("change:*", function(){
          console.log("something changed. " + JSON.stringify(this)); 
       });
   },
   
   defaults: {
       firstName: "",
       lastName: "",
       id: -1,
       birthDate: new Date()
   },
   
   fromResponse: function(resp){
      this.set("firstName", resp.firstName);
      this.set("lastName", resp.lastName);
      this.set("id", resp.id);
      this.set("birthDate", new Date(resp.birthDate));
   }
   
   /*urlRoot: currentURL + 'people'*/
    
});

module.exports = PersonModel;