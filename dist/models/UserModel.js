"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _nanoid = require("nanoid");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    default: () => (0, _nanoid.nanoid)()
  },
  firstName: String,
  lastName: String,
  type: String,
  email: String,
  password: String
}, {
  timestamps: true,
  collection: "users"
});
/**
 * @param {String} firstName
 * @param {String} lastName
 * @returns {Object} new user object created
 */

userSchema.statics.createUser = async function (firstName, lastName, type, email, pass) {
  try {
    const password = await _bcrypt.default.hash(pass, 10);
    const user = await this.create({
      firstName,
      lastName,
      type,
      email,
      password
    });
    return user;
  } catch (error) {
    throw error;
  }
};
/**
 * @param {String} id, user id
 * @return {Object} User profile object
 */


userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({
      _id: id
    });
    if (!user) throw {
      error: 'No user with this id found'
    };
    return user;
  } catch (error) {
    throw error;
  }
};
/**
 * @return {Array} List of all users
 */


userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
};
/**
 * @param {Array} ids, string of user ids
 * @return {Array of Objects} users list
 */


userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.deleteOne({
      _id: id
    });
    return result;
  } catch (error) {
    throw error;
  }
};
/**
 * @param {Array} ids, string of user ids
 * @return {Array of Objects} users list
 */


userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({
      _id: {
        $in: ids
      }
    });
    return users;
  } catch (error) {
    throw error;
  }
};
/**
 * @param {String} userEmail, string of user email
 * @return {Object} user with email
 */


userSchema.statics.getUserByEmail = async function (userEmail) {
  try {
    const user = await this.findOne({
      "email": userEmail
    });
    if (!user) return null;
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.verifyPassword = async function (email, password) {
  try {
    //Get hashed password from the database and compare
    const user = await this.findOne({
      "email": email
    });
    if (!user) throw {
      error: 'No user with this email'
    };

    const isPassword = _bcrypt.default.compareSync(password, user.password);

    if (!isPassword) throw {
      error: 'Password is incorrect'
    };
    return user;
  } catch (error) {
    throw error;
  }
};

var _default = _mongoose.default.model("User", userSchema);

exports.default = _default;
//# sourceMappingURL=UserModel.js.map