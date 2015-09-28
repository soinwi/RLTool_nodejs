var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

var PersonModel = require("./PeopleCollection")
var PersonView = require("./PersonView")

Backbone.$ = $;

var PeopleView = Backbone.View.extend({
  el: '#peopleList',
  
  initialize : function() {
    var that = this;
    
    this.render();
  },
 
  render : function() {
    var _this = this;
    
    
/*    this.$el.text("hello " + JSON.stringify(_this.collection));*/
    
    /*this.$el.empty();*/
    this.collection.each(function(m){
      
      _this.$el.append(new PersonView({model: m}).render().el);
    });
    
  }
});

module.exports = PeopleView;