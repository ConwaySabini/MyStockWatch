"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/UserController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
const router = _express.default.Router(); // Routes for the user controller to handle


router.get('/', _UserController.default.onGetAllUsers).post('/', _UserController.default.onCreateUser).get('/:id', _UserController.default.onGetUserById).get('/email/:email', _UserController.default.onGetUserByEmail).post('/login/verify', _UserController.default.onVerifyUser).delete('/:id', _UserController.default.onDeleteUserById);
var _default = router;
exports.default = _default;
//# sourceMappingURL=user.js.map