const redis = require('redis');
const client = redis.createClient(); //creates a new client

client.on('connect', function() {
  console.log('redis connected');
});

module.exports = client;