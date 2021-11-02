"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dotenv = require('dotenv').config({
  path: '../../.env'
});

const CONNECTION_URL = process.env.CONNECTION_URL;
stdout.write(CONNECTION_URL);

_mongoose.default.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

_mongoose.default.connection.on('connected', () => {
  console.log('Mongo has connected succesfully');
});

_mongoose.default.connection.on('reconnected', () => {
  console.log('Mongo has reconnected');
});

_mongoose.default.connection.on('error', error => {
  console.log('Mongo connection has an error', error);

  _mongoose.default.disconnect();
});

_mongoose.default.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected');
});
//# sourceMappingURL=mongo.js.map