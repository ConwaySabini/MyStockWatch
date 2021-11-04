"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _nanoid = require("nanoid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
// Schema for the user lists model
const userListsSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    default: () => (0, _nanoid.nanoid)()
  },
  userId: String,
  lists: [{
    id: String,
    name: String,
    stocks: [{
      id: String,
      symbol: String,
      percentChange: Number,
      timeline: String,
      status: String,
      data: {
        symbol: String,
        interval: String,
        currency: String,
        exchange_timezone: String,
        exchange: String,
        stockType: String,
        values: [{
          datetime: String,
          open: String,
          high: String,
          low: String,
          close: String,
          volume: String
        }]
      }
    }]
  }]
}, {
  timestamps: true,
  collection: "users"
}); // Creates user lists data

userListsSchema.statics.createUserLists = async function (userId, stocks) {
  try {
    // create the lists
    return await this.create({
      userId,
      stocks
    });
  } catch (error) {
    throw error;
  }
}; // Get the lists by their id and return the found lists if they exist


userListsSchema.statics.getListsById = async function (id) {
  try {
    const lists = await this.findOne({
      _id: id
    });
    if (!lists) throw {
      error: 'No lists with this id found'
    };
    return lists;
  } catch (error) {
    throw error;
  }
}; // Get the lists by their userId and return the found lists if they exist


userListsSchema.statics.getListsByUserId = async function (userId) {
  try {
    const lists = await this.findOne({
      userId: userId
    });
    if (!lists) throw {
      error: 'No lists with this userId found'
    };
    return lists;
  } catch (error) {
    throw error;
  }
}; // Get all user lists in the database and return them


userListsSchema.statics.getLists = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw error;
  }
}; // Delete lists with the given id and return the result


userListsSchema.statics.deleteListsById = async function (id) {
  try {
    return await this.deleteOne({
      _id: id
    });
  } catch (error) {
    throw error;
  }
}; // Get lists by their ids and return the found lists


userListsSchema.statics.getAllLists = async function (ids) {
  try {
    const lists = await this.find({
      _id: {
        $in: ids
      }
    });
    if (!lists) throw {
      error: 'No lists with these ids were found'
    };
    return users;
  } catch (error) {
    throw error;
  }
};

var _default = _mongoose.default.model("UserLists", userListsSchema);

exports.default = _default;
//# sourceMappingURL=UserLists.js.map