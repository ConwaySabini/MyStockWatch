// imports
require('dotenv').config();
const path = require('path');
const cors = require('cors')
const express = require('express');
import http from 'http';
import mongoose from 'mongoose';
import logger from 'morgan';
import autocompleteRouter from './routes/autocomplete.js';
import favoritesRouter from './routes/favorites.js';
import listsRouter from './routes/lists.js';
import stockRouter from './routes/stocks.js';
import subscriptionRouter from './routes/subscriptions.js';
// mongo connection
//import "./config/mongo.js";
// routes
import userRouter from './routes/user.js';
const CONNECTION_URL = process.env.MONGODB_CONNECTION;
// Redis configuration
// const redis = require("redis"),
//   client = redis.createClient();/ // client middleware for redis
// const { promisify } = require('util');
// const getAsync = promisify(client.get).bind(client);

//TODO add to package.json in development
//npm run build && nodemon --exec babel-node ./server

//TODO remove comment in developent
// const envConfig = dotenv.config();
// if (envConfig.error) {
//   throw envConfig.error;
// }

// dotenv.config({
//     path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
// });

// console.log("cors domains", process.env.CORS_DOMAINS);

const corsDomains = process.env.CORS_DOMAINS || '';
const whitelist = corsDomains.split(',').map((d) => d.trim());

const corsOptions = {
  // origin: function (origin, callback) {
  //   if (!origin || whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: whitelist,
  credentials: true,
};

const app = express();
/** Get port from environment and store in Express. */
const port = process.env.PORT || '3000';
app.set('port', port);

app.use(logger('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors(corsOptions)); //{ origin: 'https://127.0.0.1:3000' }

app.use('/users', userRouter);
app.use('/stocks', stockRouter);
app.use('/favorites', favoritesRouter);
app.use('/lists', listsRouter);
app.use('/autocomplete', autocompleteRouter);
app.use('/subscriptions', subscriptionRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist',
  });
});

/** Create HTTP server. */
const server = http.createServer(app);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Connect to the database before listening
connectDB().then(() => {
  /** Listen on provided port, on all network interfaces. */
  server.listen(port);
  /** Event listener for HTTP server "listening" event. */
  server.on('listening', () => {
    console.log(`Listening on port:: http://localhost:${port}/`);
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongo is connected');
  });
  mongoose.connection.on('reconnected', () => {
    console.log('Mongo is reconnected');
  });
  mongoose.connection.on('error', (error) => {
    console.log('Error on mongo connection', error);
    mongoose.disconnect();
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongo is disconnected');
  });
});

// async function getSubscriptions() {
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
