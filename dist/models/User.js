"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.USER_TYPES = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _nanoid = require("nanoid");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
const USER_TYPES = {
  CONSUMER: "consumer",
  ADMIN: "admin"
}; // Schema for the user model

exports.USER_TYPES = USER_TYPES;
const userSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    default: () => (0, _nanoid.nanoid)()
  },
  userId: String,
  firstName: String,
  lastName: String,
  type: String,
  email: String,
  password: String
}, {
  timestamps: true,
  collection: "users"
}); // Creates a new user with the given email, password, firstName, lastName, and type
// Returns the newly created user

userSchema.statics.createUser = async function (userId, firstName, lastName, type, email, pass) {
  try {
    // Hash the password with 10 rounds of salting
    const password = await _bcrypt.default.hash(pass, 10); // create the user

    return await this.create({
      userId,
      firstName,
      lastName,
      type,
      email,
      password
    });
  } catch (error) {
    throw error;
  }
}; // Get the user by their id and return the found user if they exist


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
}; // Get the user by their userId and return the found user if they exist


userSchema.statics.getUserByUserId = async function (userId) {
  try {
    const user = await this.findOne({
      userId: userId
    });
    if (!user) throw {
      error: 'No user with this userId found'
    };
    return user;
  } catch (error) {
    throw error;
  }
}; // Get all users in the database and return them


userSchema.statics.getUsers = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw error;
  }
}; // Delete a user with the given id and return the result


userSchema.statics.deleteUserById = async function (id) {
  try {
    return await this.deleteOne({
      _id: id
    });
  } catch (error) {
    throw error;
  }
}; // Get users by their ids and return the found users


userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({
      _id: {
        $in: ids
      }
    });
    if (!users) throw {
      error: 'No users with these ids were found'
    };
    return users;
  } catch (error) {
    throw error;
  }
}; // Get a user with the given email and return the found user if they exist


userSchema.statics.getUserByEmail = async function (userEmail) {
  try {
    const user = await this.findOne({
      "email": userEmail
    }); // return null if the user doesn't exist

    if (!user) return null;
    return user;
  } catch (error) {
    throw error;
  }
}; // Verify the email and password of the user


userSchema.statics.verifyPassword = async function (email, password) {
  try {
    // Get hashed password from the database and compare
    const user = await this.findOne({
      "email": email
    }); // Throw error if user doesn't exist

    if (!user) throw {
      error: 'No user with this email'
    }; // Compare the password with the hashed password

    const isPassword = _bcrypt.default.compareSync(password, user.password); // Throw error if password is incorrect


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
//# sourceMappingURL=User.js.map