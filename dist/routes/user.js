"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../controllers/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
const router = _express.default.Router();

router.get('/', _User.default.onGetAllUsers).post('/', _User.default.onCreateUser).get('/:id', _User.default.onGetUserById).get('/email/:email', _User.default.onGetUserByEmail).post('/login/verify', _User.default.onVerifyUser).delete('/:id', _User.default.onDeleteUserById);
var _default = router;
exports.default = _default;
//# sourceMappingURL=user.js.map