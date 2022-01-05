"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/UserController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
// middlewares
//import { encode } from '../auth/jwt.js';
//const jwt = require('jsonwebtoken');
const router = _express.default.Router(); // router
//   .post('/login/:userId', encode, (req, res, next) => {
//     return res
//       .status(200)
//       .json({
//         success: true,
//         authorization: req.authToken,
//       });
//   })


var _default = router;
exports.default = _default;
//# sourceMappingURL=index.js.map