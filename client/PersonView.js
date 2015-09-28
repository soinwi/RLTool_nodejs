var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");
var PersonModel = require("./PersonModel")
Backbone.$ = $;

var PersonView = Backbone.View.extend({
    
    el: '#person',
    
    
    render: function(){
        var _this = this;
        
        this.$el.text("person-render: " + JSON.stringify(_this.model));
    }
    
});

module.exports = PersonView;