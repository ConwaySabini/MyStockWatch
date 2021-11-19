"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

require("./config/mongo.js");

var _index = _interopRequireDefault(require("./routes/index.js"));

var _user = _interopRequireDefault(require("./routes/user.js"));

var _stocks = _interopRequireDefault(require("./routes/stocks.js"));

var _favorites = _interopRequireDefault(require("./routes/favorites.js"));

var _lists = _interopRequireDefault(require("./routes/lists.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
const dotenv = require('dotenv');

// Redis configuration
// const redis = require("redis"),
//   client = redis.createClient();/ // client middleware for redis
// const { promisify } = require('util');
// const getAsync = promisify(client.get).bind(client);
const envConfig = dotenv.config();

if (envConfig.error) {
  throw envConfig.error;
}

const corsDomains = process.env.CORS_DOMAINS || "";
const whitelist = corsDomains.split(",").map(d => d.trim());
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};
console.log(corsOptions);
console.log(whitelist);
const app = (0, _express.default)();
/** Get port from environment and store in Express. */

const port = process.env.PORT || "3000";
app.set("port", port);
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cors.default)(corsOptions)); //{ origin: 'https://127.0.0.1:3000' }

app.use("/users", _user.default);
app.use("/stocks", _stocks.default);
app.use("/favorites", _favorites.default);
app.use("/lists", _lists.default);
/** catch 404 and forward to error handler */

app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  });
}); // Get the information from the api 
// app.get('/api/jobs', async (req, res) => {
//   const jobs = await getAsync('github');
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   return res.send(jobs);
// });

/** Create HTTP server. */

const server = _http.default.createServer(app);
/** Listen on provided port, on all network interfaces. */


server.listen(port);
/** Event listener for HTTP server "listening" event. */

server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
}); // const fetchGithub = require('./fetch/fetch-github')
// const Cron = require('cron').CronJob;
// // sends request every minute
// new Cron('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');
//# sourceMappingURL=index.js.map