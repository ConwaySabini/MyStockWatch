"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Autocomplete = _interopRequireDefault(require("../models/Autocomplete.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libraries
const validator = require('validator'); // models


// Export Autocomplete Controller
var _default = {
  // Returns a list of all stocks
  onGetAutocomplete: async (req, res) => {
    try {
      // finds all stocks and returns them
      const autocomplete = await _Autocomplete.default.getAutocomplete();
      return res.status(200).json({
        success: true,
        autocomplete
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Tries to create autocomplete, returns the autocomplete on success,
  // otherwise returns an error
  onCreateAutocomplete: async (req, res) => {
    try {
      const {
        trie
      } = req.body; //console.log("trie: ", trie);
      // create the autocomplete
      //const string = JSON.stringify(trie);

      const createdAutocomplete = await _Autocomplete.default.createAutocomplete(trie); //const autocomplete = new Autocomplete({ trie: string });
      //await autocomplete.save();
      // return the autocomplete and success message

      return res.status(200).json({
        success: true,
        createdAutocomplete
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Delete the autocomplete with the given id and returns the success message on success,
  // otherwise returns an error
  onDeleteAutocomplete: async (req, res) => {
    try {
      const trie = await _Autocomplete.default.deleteAutocomplete(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${trie.deletedCount} tries.`
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  }
};
exports.default = _default;
//# sourceMappingURL=AutocompleteController.js.map