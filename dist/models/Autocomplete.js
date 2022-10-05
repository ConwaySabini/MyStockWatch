"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _nanoid = require("nanoid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
// // Schema for each stock
// const nameSchema = new mongoose.Schema(
//     {
//         country: String,
//         currency: String,
//         exchange: String,
//         name: String,
//         symbol: String,
//         type: String,
//     },
// );
// const childrenSchema = new mongoose.Schema(
//     {
//         letter: mongoose.Schema.Types.Mixed,
//         children: {
//             type: Map,
//             of: mongoose.Schema.Types.Mixed,
//         },
//         data: mongoose.Schema.Types.Mixed,
//         word: mongoose.Schema.Types.Mixed,
//     },
// );
// Schema for the user model
const autocompleteSchema = new _mongoose.default.Schema({// _id: {
  //     type: String,
  //     default: () => nanoid(),
  // }
  //trie: {}
}, {
  strict: false
}); // Creates the stock list for autocomplete

autocompleteSchema.statics.createAutocomplete = async function (trie) {
  try {
    // create the names
    // const createdAutocomplete = mongoose.model("autocomplete", autocompleteSchema);
    // const autocomplete = new createdAutocomplete({ trie: trie });
    // autocomplete.save();
    // return autocomplete;
    const created = await this.create({
      trie
    }); //created.save();
    //return created;
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
}; // Delete a trie with the given id and return the result


autocompleteSchema.statics.deleteAutocomplete = async function (id) {
  try {
    return await this.deleteOne({
      _id: id
    });
  } catch (error) {
    throw error;
  }
};

var _default = _mongoose.default.model("Autocomplete", autocompleteSchema);

exports.default = _default;
//# sourceMappingURL=Autocomplete.js.map