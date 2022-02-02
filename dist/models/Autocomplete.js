"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _nanoid = require("nanoid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
// Schema for each stock
const nameSchema = new _mongoose.default.Schema({
  country: String,
  currency: String,
  exchange: String,
  name: String,
  symbol: String,
  type: String
}); // Schema for the user model

const autocompleteSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    default: () => (0, _nanoid.nanoid)()
  },
  names: [nameSchema]
}, {
  timestamps: true,
  collection: "users"
}); // Creates the stock list for autocomplete

autocompleteSchema.statics.createAutocomplete = async function (names) {
  try {
    // create the names
    return await this.create({
      names
    });
  } catch (error) {
    throw error;
  }
}; // Get all users in the database and return them


autocompleteSchema.statics.getAutocomplete = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw error;
  }
};

var _default = _mongoose.default.model("Autocomplete", autocompleteSchema);

exports.default = _default;
//# sourceMappingURL=Autocomplete.js.map