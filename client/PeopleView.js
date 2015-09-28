var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");
var PersonModel = require("./PeopleCollection")
Backbone.$ = $;

var PeopleView = Backbone.View.extend({
  el: '#peopleList',
  
  initialize : function() {
    var that = this;
    
    this.render();
  },
 
  render : function() {
    var _this = this;
    this.$el.text("hello " + JSON.stringify(_this.collection));
  }
});

module.exports = PeopleView;