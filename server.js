var odata = require('node-odata');


var server = odata('mongodb://localhost:27017/test');

server.use(require('./resources/people'));
server.use(require('./resources/results'));
server.use(require('./resources/static'));



server.listen(process.env.PORT || 3000, function(){console.log("Server running...")});