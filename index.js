const enmapi = require('enmapi');

const env = process.env; // require('./env.js');

enmapi.server.setConfig({
  Level: env.NODE_ENV,
  Name: env.NAME,
  Host: env.HOST,
  Port: env.PORT,
  DatabaseName: env.DBNAME,
  DatabaseURI: env.DB_URI
});

enmapi.server.start();

// GH_WEBHOOK_SECRET
