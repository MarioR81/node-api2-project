const express = require('express');

const Posts = require('../data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Hubs API</h>
      <p>Welcome to the Lambda Hubs API</p>
    `);
  });

module.exports = server;