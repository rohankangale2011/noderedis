const mongoose = require('mongoose');

const serverUrl = 'mongodb://localhost:27017';
const dbName = 'redis_db';

const dbURL = `${serverUrl}/${dbName}`;

mongoose.Promise = global.Promise;
mongoose.connect(dbURL);

// when successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to:' + dbURL);
});

// when connection throws an error
mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

// when connection is disconnected
mongoose.connection.on('disconnected', (err) => {
  console.log('Mongoose default connection disconnected:', err);
});

// close the Mongoose connection when node process ends
process.on('SIGINT', function() {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});