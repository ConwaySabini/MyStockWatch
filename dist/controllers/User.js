"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserModel = _interopRequireWildcard(require("../models/UserModel.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// utils
//import makeValidation from '@withvoid/make-validation';
// models
var _default = {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await _UserModel.default.getUsers();
      return res.status(200).json({
        success: true,
        users
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await _UserModel.default.getUserById(req.params.id);
      return res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  onGetUserByEmail: async (req, res) => {
    try {
      const user = await _UserModel.default.getUserByEmail(req.params.email);
      return res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  onCreateUser: async (req, res) => {
    try {
      // const validation = makeValidation(types => ({
      //   payload: req.body,
      //   checks: {
      //     firstName: { type: types.string },
      //     lastName: { type: types.string },
      //     type: { type: types.enum, options: { enum: USER_TYPES } },
      //     email: { type: types.string },
      //     password: { type: types.string },
      //   }
      // }));
      // if (!validation.success) return res.status(400).json(validation);
      const {
        firstName,
        lastName,
        type,
        email,
        password
      } = req.body;
      const found = await _UserModel.default.getUserByEmail(email);
      if (found !== null) return res.status(500).json({
        success: false,
        error: 'There is already an account associated with this email.'
      });
      const user = await _UserModel.default.createUser(firstName, lastName, type, email, password);
      return res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await _UserModel.default.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  onVerifyUser: async (req, res) => {
    try {
      // const validation = makeValidation(types => ({
      //   payload: req.body,
      //   checks: {
      //     email: { type: types.string },
      //     password: { type: types.string },
      //   }
      // }));
      const {
        email,
        password
      } = req.body;
      const isEmail = email.includes('@'); // if (!validation.success || !isEmail) return res.status(400).json(validation);

      const user = await _UserModel.default.verifyPassword(email, password);
      if (user) return res.status(200).json({
        success: true,
        id: user._id
      });else return res.status(500).json({
        success: false,
        error: 'Password is incorrect.'
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
//# sourceMappingURL=User.js.map