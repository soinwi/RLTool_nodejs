var Resource = require('node-odata').Resource;

module.exports = Resource('people', {
    firstName: String,
    lastName: String,
    birthDate: Date
});