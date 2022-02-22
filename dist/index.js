"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

require("./config/mongo.js");

var _user = _interopRequireDefault(require("./routes/user.js"));

var _stocks = _interopRequireDefault(require("./routes/stocks.js"));

var _favorites = _interopRequireDefault(require("./routes/favorites.js"));

var _lists = _interopRequireDefault(require("./routes/lists.js"));

var _autocomplete = _interopRequireDefault(require("./routes/autocomplete.js"));

var _subscriptions = _interopRequireDefault(require("./routes/subscriptions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
const dotenv = require('dotenv');

const path = require('path');

const axios = require('axios').default;

// Redis configuration
// const redis = require("redis"),
//   client = redis.createClient();/ // client middleware for redis
// const { promisify } = require('util');
// const getAsync = promisify(client.get).bind(client);
//TODO add to package.json in development
//npm run build && nodemon --exec babel-node ./server
//TODO remove comment if using .env file
// const envConfig = dotenv.config();
// if (envConfig.error) {
//   throw envConfig.error;
// }
// dotenv.config({
//     path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
// });
// console.log("cors domains", process.env.CORS_DOMAINS);
const corsDomains = process.env.CORS_DOMAINS || "";
const whitelist = corsDomains.split(",").map(d => d.trim());
const corsOptions = {
  // origin: function (origin, callback) {
  //   if (!origin || whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: whitelist,
  credentials: true
};
const app = (0, _express.default)();
/** Get port from environment and store in Express. */

const port = process.env.PORT || "3000";
app.set("port", port);
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json({
  limit: "100mb"
}));
app.use(_express.default.urlencoded({
  extended: true,
  limit: "100mb"
}));
app.use((0, _cors.default)(corsOptions)); //{ origin: 'https://127.0.0.1:3000' }

app.use("/users", _user.default);
app.use("/stocks", _stocks.default);
app.use("/favorites", _favorites.default);
app.use("/lists", _lists.default);
app.use("/autocomplete", _autocomplete.default);
app.use("/subscriptions", _subscriptions.default);
/** catch 404 and forward to error handler */

app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  });
});
/** Create HTTP server. */

const server = _http.default.createServer(app);
/** Listen on provided port, on all network interfaces. */


server.listen(port);
/** Event listener for HTTP server "listening" event. */

server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
}); // async function getSubscriptions() {
//     try {
//         const GET_SUBSCRIPTIONS = process.env.GET_SUBSCRIPTIONS;
//         const response = axios.request(GET_SUBSCRIPTIONS);
//         console.log("response: ", response);
//         // handle error
//         if (response.data.status === "error") {
//             console.log(response.data.message);
//         } else {
//             console.log("all subscriptions ", response.data);
//             return response.data;
//         }
//         // handle error 
//     } catch (error) {
//         console.error(error);
//     }
// }
// async function callGet() {
//     const subscriptions = await getSubscriptions();
//     console.log("subscriptions ", subscriptions);
//     return subscriptions;
// }
// const analyzeStock = require('./fetch/analyze-api');
// const Cron = require('cron').CronJob;
// let subscriptions = callGet();
// console.log("jobs", Cron.scheduledJobs);
// for (job : Cron.scheduledJobs) {
//     console.log("cron job", job);
//     //Cron.scheduledJobs[i].stop();
// }
// TODO get all subscriptions and run cron jobs for each one
//analyzeStock(userId, symbol);
// // sends request every minute
// new Cron('* * * * *', analyzeStock, null, true, 'America/Los_Angeles');
// Get the information from the api 
// app.get('/api/jobs', async (req, res) => {
//   const jobs = await getAsync('github');
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   return res.send(jobs);
// });
//# sourceMappingURL=index.js.map