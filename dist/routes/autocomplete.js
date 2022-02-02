"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _AutocompleteController = _interopRequireDefault(require("../controllers/AutocompleteController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
const router = _express.default.Router(); // Routes for the autocomplete controller to handle


router.get('/', _AutocompleteController.default.onGetAutocomplete).put('/', _AutocompleteController.default.onCreateAutocomplete);
var _default = router;
exports.default = _default;
//# sourceMappingURL=autocomplete.js.map