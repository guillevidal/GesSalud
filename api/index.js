const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require("axios");



conn.sync({ force: true }).then( async () => {

  
    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });