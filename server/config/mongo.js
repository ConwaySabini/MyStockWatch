// imports
import mongoose from 'mongoose';
require('dotenv').config();
const path = require('path');

// console.log("dirname: ", __dirname);

// dotenv.config({
//     path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
// });

// console.log(process.env.MONGODB_CONNECTION);

// import environment variable for MongoDB connection
const CONNECTION_URL = process.env.MONGODB_CONNECTION;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongo is connected')
});
mongoose.connection.on('reconnected', () => {
    console.log('Mongo is reconnected')
});
mongoose.connection.on('error', error => {
    console.log('Error on mongo connection', error)
    mongoose.disconnect()
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongo is disconnected')
});
