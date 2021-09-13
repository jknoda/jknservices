const server = require('./config/server');
require('./database/dbinit');
require('./config/routes')(server);
