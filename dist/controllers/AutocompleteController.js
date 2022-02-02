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
  // Tries to create autocomplete, returns the stocks on success,
  // otherwise returns an error
  onCreateAutocomplete: async (req, res) => {
    try {
      const {
        names
      } = req.body; // create the autocomplete

      const createdAutocomplete = await _Autocomplete.default.createAutocomplete(names); // return the autocomplete and success message

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
  }
};
exports.default = _default;
//# sourceMappingURL=AutocompleteController.js.map