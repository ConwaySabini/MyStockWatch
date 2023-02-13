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
  data: {
    meta: _mongoose.default.Schema.Types.Mixed,
    values: [_mongoose.default.Schema.Types.Mixed],
    status: String
  },
  percentChange: Number,
  timeline: String,
  id: String
}); // Schema for the list Objects

const list = new _mongoose.default.Schema({
  id: String,
  name: String,
  stocks: [stockSchema]
}); // Schema for the user lists model

const listsSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    default: () => (0, _nanoid.nanoid)()
  },
  userId: String,
  lists: [list]
}, {
  timestamps: true,
  collection: "lists"
}); // Creates user lists

listsSchema.statics.createUserLists = async function (userId, lists) {
  try {
    // create the lists
    return await this.create({
      userId,
      lists
    });
  } catch (error) {
    throw error;
  }
}; // Updates user favorite data


listsSchema.statics.updateUserLists = async function (userId, lists) {
  try {
    // delete the existing lists
    await this.deleteOne({
      userId: userId
    }); // create the updated lists

    await this.create({
      userId,
      lists
    });
  } catch (error) {
    throw error;
  }
}; // Get the lists by their id and return the found lists if they exist


listsSchema.statics.getListsById = async function (id) {
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


listsSchema.statics.getListsByUserId = async function (userId) {
  try {
    return this.findOne({
      userId: userId
    });
  } catch (error) {
    throw error;
  }
}; // Get all user lists in the database and return them


listsSchema.statics.getAllLists = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw error;
  }
}; // Delete lists with the given id and return the result


listsSchema.statics.deleteListsById = async function (id) {
  try {
    return await this.deleteOne({
      _id: id
    });
  } catch (error) {
    throw error;
  }
}; // Delete the lists by their userId and return result


listsSchema.statics.deleteListsByUserId = async function (userId) {
  try {
    return await this.deleteOne({
      userId: userId
    });
  } catch (error) {
    throw error;
  }
}; // Get lists by their ids and return the found lists


listsSchema.statics.getLists = async function (ids) {
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

var _default = _mongoose.default.model("Userlists", listsSchema);

exports.default = _default;
//# sourceMappingURL=UserLists.js.map