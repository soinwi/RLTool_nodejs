var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");
var PersonModel = require("./PersonModel")
Backbone.$ = $;

var PersonView = Backbone.View.extend({

    tagName: 'li',
    className: 'personView',

    initialize: function() {
        _.bindAll(this, "render");

        if (this.model) {
            this.model.on('change', this.render, this);
            console.log(this.model);
        }

    },

    events: {
        'click': 'clicked',
        'reset': 'render'
    },

    render: function() {
        var _this = this;

        var tmplt = _.template('<li><b><%=firstName%> <%= lastName %></b><br><%= birthDate %></li>');
        console.log(_this.model);

        this.$el.html(tmplt(_this.model.toJSON()));
        return this;
    },

    clicked: function(e) {
        var _this = this;
        console.log(e);
        alert("hi, i got clicked: " + e);
        this.model.set("firstName", "testname");
        this.model.save(this.model.toJSON(), {
            success: function() {
                _this.model.fetch({
                    reset: true,
                    update: true
                });
            }

        });
    },


});

module.exports = PersonView;