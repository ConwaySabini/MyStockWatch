"use strict";

const dotenv = require('dotenv');

const redis = require("redis");

const {
  google
} = require('googleapis');

const OAuth2 = google.auth.OAuth2;

const nodemailer = require("nodemailer");

const axios = require('axios').default; // const client = redis.createClient();
// const { promisify } = require("util");
// const setAsync = promisify(client.set).bind(client);
// Relative Strength Index(RSI) is a momentum indicator, 
// which calculates the magnitude of a price change to assess 
// the overbought and oversold conditions in the price of an asset.


function setRSI(symbol) {
  return {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/rsi',
    params: {
      symbol: `${symbol}`,
      interval: '5min',
      outputsize: '30',
      series_type: 'close',
      time_period: '14',
      format: 'json'
    },
    headers: {
      'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
    }
  };
} // On Balance Volume(OBV) is a momentum indicator, which uses volume flow to forecast upcoming price changes.


function setOBV(symbol) {
  return {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/obv',
    params: {
      interval: '5min',
      symbol: `${symbol}`,
      series_type: 'close',
      outputsize: '30',
      format: 'json'
    },
    headers: {
      'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
    }
  };
} // Bollinger Bands®(BBANDS) are volatility bands located above and below a moving average. 
// The volatility size parameter depends on standard deviation.


function setBBANDS(symbol) {
  return {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/bbands',
    params: {
      interval: '5min',
      symbol: `${symbol}`,
      format: 'json',
      outputsize: '30',
      time_period: '20',
      ma_type: 'SMA',
      series_type: 'close',
      sd: '2'
    },
    headers: {
      'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
    }
  };
} // Axios options for getting stock data from 12 Data API


function setOptions(symbol) {
  return {
    method: 'GET',
    url: process.env.REACT_APP_RAPIDAPI_TIME_URL,
    params: {
      interval: '5min',
      symbol: `${symbol}`,
      format: 'json',
      outputsize: '30'
    },
    headers: {
      'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
    }
  };
}

async function createEmailTransporter() {
  const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "https://developers.google.com/oauthplayground");
  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }

      resolve(token);
    });
  }); // create nodemailer transporter

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      accessToken,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });
} // Send an email with the following options


async function sendMail(mailOptions) {
  let transporter = await createEmailTransporter();
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

async function getUserEmail(userId) {
  try {
    const GET_USER = process.env.GET_USER + userId;
    const response = await axios.request(GET_USER); // handle error

    if (response.data.status === "error") {
      console.log(response.data.message);
    } else {
      console.log("email ", response.data.email);
      return response.data.email;
    } // handle error 

  } catch (error) {
    console.error(error);
  }
}

async function getUserSubscriptions(userId) {
  try {
    const GET_SUBSCRIPTIONS = process.env.GET_SUBSCRIPTIONS_BY_USER + userId;
    const response = await axios.request(GET_SUBSCRIPTIONS); // handle error

    if (response.data.status === "error") {
      console.log(response.data.message);
    } else {
      console.log("subscriptions ", response.data);
      return response.data;
    } // handle error 

  } catch (error) {
    console.error(error);
  }
}

async function updateSubscriptionsByUser(userId, subscriptions) {
  //TODO implement
  try {
    const GET_SUBSCRIPTIONS = process.env.GET_SUBSCRIPTIONS_BY_USER + userId;
    const response = await axios.request(GET_SUBSCRIPTIONS); // handle error

    if (response.data.status === "error") {
      console.log(response.data.message);
    } else {
      console.log("subscriptions ", response.data);
      return response.data;
    } // handle error 

  } catch (error) {
    console.error(error);
  }
} // Calculate the Bollinger Bands over a period of time


const calculateBBANDS = data => {
  let values = [];
  values.push([]);
  values.push([]);
  values.push([]); // 30 dates and prices for the graph

  let taIndex = data.values.length - 1; // Loop through each date and price for the stock and add it to the arrays

  for (let i = 0; i < data.values.length; i++) {
    values[0][taIndex] = data.values[i].lower_band;
    values[1][taIndex] = data.values[i].middle_band;
    values[2][taIndex] = data.values[i].upper_band;
    taIndex--;
  }

  return values;
};

async function getBBANDS(userId, symbol) {
  try {
    let BBANDS = setBBANDS(symbol);
    const response = await axios.request(BBANDS);
    const data = await getPrice(symbol); // handle error

    if (response.data.status === "error") {
      console.log(response.data.message);
    } else {
      const values = calculateBBANDS(response.data);
      const currentPrice = data.values[0].close; // if the price is above the middle band, buy signal

      if (currentPrice < values[0][29]) {
        let rsi = await getRSI(symbol);

        if (rsi) {
          const email = await getUserEmail(userId);
          const userSubscriptions = await getUserSubscriptions(userId);
          const updateSubscriptions = await updateSubscriptionsByUser(userId, userSubscriptions); // Options for sending the mail

          let mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: 'tomerpacific@gmail.com',
            subject: 'Nodemailer Project',
            text: 'Hi from your nodemailer project'
          };
          const res = await sendMail(mailOptions); // TODO send buy email if rsi below 30
          // TODO set stoploss at -10%???
          // TODO take profit when price breaks above upper bollinger band
        } else {// TODO modify database and wait until rsi is above 70 or below 30 to send email
          // TODO boolean for if bollinger band has crossed middle line to confirm buy or sell signal when waiting for rsi to confirm
        }
      }
    } // handle error

  } catch (error) {
    console.error(error);
  }
}

async function getRSI(symbol) {
  try {
    let RSI = setRSI(symbol);
    const response = await axios.request(RSI); // handle error

    if (response.data.status === "error") {
      console.log(response.data.message);
    } else {
      if (response.data.rsi > 70) {
        // return false as sell signal for stock
        return false;
      } else if (response.data.rsi < 30) {
        // return true as buy signal for stock
        return true;
      }
    } // handle error

  } catch (error) {
    console.error(error);
  }
}

async function getOBV() {
  try {
    const response = await axios.request(STOCH); // handle error

    if (response.data.status === "error") {
      console.log(response.data.message);
    } else {
      if (stoch > 80) {// Overbought condition, take sell position?
      } else if (stoch < 20) {// Oversold condition, take buy position?
      }
    } // handle error

  } catch (error) {
    console.error(error);
  }
}

async function getPrice(symbol) {
  try {
    let options = setOptions(symbol);
    const response = await axios.request(options); // handle error

    if (response.data.status === "error") {
      console.log(response.data.message);
    } else {
      return response.data;
    } // handle error

  } catch (error) {
    console.error(error);
  }
} // Gets the data


async function analyzeStock(userId, symbol) {
  // TODO check if starting signals have been met (above bollinger bands, etc)
  // TODO skip checking those signals that have already been met
  const data = await getBBANDS(userId, symbol); // store data in redis
  // const success = await setAsync('github', JSON.stringify(interns));
  // console.log({ success });
} //fetchGithub();


module.exports = analyzeStock;
//# sourceMappingURL=analyze-api.js.map