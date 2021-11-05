"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _ListsController = _interopRequireDefault(require("../controllers/ListsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
const router = _express.default.Router(); // Routes for the lists controller to handle


router.get('/', _ListsController.default.onGetAllLists).get('/:id', _ListsController.default.onGetListsById).get('/userId/:userId', _ListsController.default.onGetListsByUserId).put('/', _ListsController.default.onCreateLists).put('/update/', _ListsController.default.onUpdateListsByUserId).delete('/:id', _ListsController.default.onDeleteListsById).delete('/userId/:userId', _ListsController.default.onDeleteListsByUserId);
var _default = router;
exports.default = _default;
//# sourceMappingURL=lists.js.map