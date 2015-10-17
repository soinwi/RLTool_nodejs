var Resource = require('node-odata').Resource;

module.exports = Resource('results', {
    personId : String,
    result : Number,
    description : String
});