const express = require('express');

const router = require('../data/router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda API</h>
      <p>Welcome to the API</p>
    `);
  });

server.use('/api/posts', router);

module.exports = server;