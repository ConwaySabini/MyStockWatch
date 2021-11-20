// imports
const dotenv = require('dotenv');
import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
// mongo connection
import "./config/mongo.js";
// routes
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import stockRouter from "./routes/stocks.js";
import favoritesRouter from "./routes/favorites.js";
import listsRouter from "./routes/lists.js";
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
}

const app = express();
/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions)); //{ origin: 'https://127.0.0.1:3000' }

app.use("/users", userRouter);
app.use("/stocks", stockRouter);
app.use("/favorites", favoritesRouter);
app.use("/lists", listsRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

// Get the information from the api 
// app.get('/api/jobs', async (req, res) => {
//   const jobs = await getAsync('github');
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   return res.send(jobs);
// });

/** Create HTTP server. */
const server = http.createServer(app);

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});

// const fetchGithub = require('./fetch/fetch-github')

// const Cron = require('cron').CronJob;
// // sends request every minute
// new Cron('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');
