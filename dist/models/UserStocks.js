"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _nanoid = require("nanoid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
// Schema for the stock Objects
const stockSchema = new _mongoose.default.Schema({
  symbol: String,
  data: [_mongoose.default.Schema.Types.Mixed],
  percentChange: Number,
  timeline: String,
  id: String
}); // Schema for the user stocks model

const stockDataSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    default: () => (0, _nanoid.nanoid)()
  },
  userId: String,
  stocks: [stockSchema]
}, {
  timestamps: true,
  collection: "stocks"
}); // Creates user stock data

stockDataSchema.statics.createUserStocks = async function (userId, stocks) {
  try {
    // create the stocks if they do not exist
    return await this.create({
      userId,
      stocks
    });
  } catch (error) {
    throw error;
  }
}; // Updates user stock data


stockDataSchema.statics.updateUserStocks = async function (userId, stocks) {
  try {
    // find the stocks for the specified user
    const foundStocks = await this.findOne({
      userId: userId
    });
    if (!foundStocks) throw {
      error: 'No stocks with this userId found'
    }; // update the stocks

    this.update({
      _id: foundStocks._id
    }, {
      stocks: stocks
    });
    const updated = await this.findOne({
      userId: userId
    });
    console.log(updated); //this.markModified();
  } catch (error) {
    throw error;
  }
}; // Get the stocks by their id and return the found stocks if they exist


stockDataSchema.statics.getStocksById = async function (id) {
  try {
    const stocks = await this.findOne({
      _id: id
    });
    if (!stocks) throw {
      error: 'No stocks with this id found'
    };
    return stocks;
  } catch (error) {
    throw error;
  }
}; // Get the stocks by their userId and return the found stocks if they exist


stockDataSchema.statics.getStocksByUserId = async function (userId) {
  try {
    return await this.findOne({
      userId: userId
    });
  } catch (error) {
    throw error;
  }
}; // Get all user stocks in the database and return them


stockDataSchema.statics.getAllStocks = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw error;
  }
}; // Delete stocks with the given id and return the result


stockDataSchema.statics.deleteStocksById = async function (id) {
  try {
    return await this.deleteOne({
      _id: id
    });
  } catch (error) {
    throw error;
  }
}; // Delete the stocks by their userId and return result


stockDataSchema.statics.deleteStocksByUserId = async function (userId) {
  try {
    return await this.deleteOne({
      userId: userId
    });
  } catch (error) {
    throw error;
  }
}; // Get stocks by their ids and return the found stocks


stockDataSchema.statics.getStocks = async function (ids) {
  try {
    const stocks = await this.find({
      _id: {
        $in: ids
      }
    });
    if (!stocks) throw {
      error: 'No stocks with these ids were found'
    };
    return users;
  } catch (error) {
    throw error;
  }
};

var _default = _mongoose.default.model("UserStocks", stockDataSchema);

exports.default = _default;
//# sourceMappingURL=UserStocks.js.map