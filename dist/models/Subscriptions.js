"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _nanoid = require("nanoid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
// Schema for the subscription data model
const dataModel = new _mongoose.default.Schema({
  // Flags can work for telling if rsi is over 50 or under (or 70 and 30 depending on the strategy)
  symbol: String,
  crossedLowerBand: Boolean,
  crossedUpperBand: Boolean,
  Stoploss: Number,
  // has the stock been bought?
  isBought: Boolean,
  // price of obv before to compare with current and determine if rising
  lastOBV: Number
}); // Schema for the subscription model

const subscriptionSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    default: () => (0, _nanoid.nanoid)()
  },
  userId: String,
  symbols: [dataModel] //TODO add a name field to schema and to all other code including models, views, and components

}, {
  timestamps: true,
  collection: "subscriptions"
}); // Updates user subscription data

subscriptionSchema.statics.updateUserSubscriptions = async function (userId, symbols) {
  try {
    // updated the symbols
    const updatedSymbols = await this.findOneAndUpdate(userId, {
      symbols: symbols
    });
  } catch (error) {
    throw error;
  }
}; // // Adds a user subscription data
// subscriptionSchema.statics.updateUserSubscriptions = async function (userId, symbols) {
//     try {
//         // updated the symbols
//         const updatedSymbols = await this.findOneAndUpdate(userId, { symbols: symbols });
//     } catch (error) {
//         throw error;
//     }
// }
// Get the subscription by their userId and return the found subscriptions if they exist


subscriptionSchema.statics.getSubscriptionsByUserId = async function (userId) {
  try {
    const subscriptions = await this.findOne({
      userId: userId
    });
    if (!subscriptions) throw {
      error: 'No subscriptions with this userId found'
    };
    return subscriptions;
  } catch (error) {
    throw error;
  }
}; // Delete a subscription with the given userId and return the result


subscriptionSchema.statics.deleteSubscriptionByUserId = async function (userId, symbols) {
  try {
    // TODO test because based on 2 fields
    // TODO how to find the stock symbol in the array??????
    return await this.deleteOne({
      userId: userId,
      symbols: symbols
    });
  } catch (error) {
    throw error;
  }
}; // Deletes all subscriptions with the given userId and return the result


subscriptionSchema.statics.deleteAllSubscriptionsByUserId = async function (userId) {
  try {
    return await this.deleteOne({
      userId: userId
    });
  } catch (error) {
    throw error;
  }
}; // Creates the stock list for autocomplete


subscriptionSchema.statics.createSubscription = async function (userId, symbols) {
  try {
    // create the names
    return await this.create({
      userId,
      symbols
    });
  } catch (error) {
    throw error;
  }
}; // Get all users in the database and return them


subscriptionSchema.statics.getSubscriptions = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw error;
  }
};

var _default = _mongoose.default.model("Subscriptions", subscriptionSchema);

exports.default = _default;
//# sourceMappingURL=Subscriptions.js.map