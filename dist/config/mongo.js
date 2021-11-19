"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
require('dotenv').config(); // import environment variable for MongoDB connection


const CONNECTION_URL = process.env.MONGODB_CONNECTION; //console.log(CONNECTION_URL);

_mongoose.default.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

_mongoose.default.connection.on('connected', () => {
  console.log('Mongo is connected');
});

_mongoose.default.connection.on('reconnected', () => {
  console.log('Mongo is reconnected');
});

_mongoose.default.connection.on('error', error => {
  console.log('Error on mongo connection', error);

  _mongoose.default.disconnect();
});

_mongoose.default.connection.on('disconnected', () => {
  console.log('Mongo is disconnected');
});
//# sourceMappingURL=mongo.js.map