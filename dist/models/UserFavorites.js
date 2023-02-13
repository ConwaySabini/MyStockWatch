"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _nanoid = require("nanoid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
// Schema for the favorite Objects
const favoriteSchema = new _mongoose.default.Schema({
  symbol: String,
  data: {
    meta: _mongoose.default.Schema.Types.Mixed,
    values: [_mongoose.default.Schema.Types.Mixed],
    status: String
  },
  percentChange: Number,
  timeline: String,
  id: String
}); // Schema for the user favorites model

const favoritesSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    default: () => (0, _nanoid.nanoid)()
  },
  userId: String,
  favorites: [favoriteSchema]
}, {
  timestamps: true,
  collection: "favorites"
}); // Creates user favorites

favoritesSchema.statics.createUserFavorites = async function (userId, favorites) {
  try {
    // create the favorites
    return await this.create({
      userId,
      favorites
    });
  } catch (error) {
    throw error;
  }
}; // Updates user favorite data


favoritesSchema.statics.updateUserFavorites = async function (userId, favorites) {
  try {
    // delete the existing favorites
    await this.deleteOne({
      userId: userId
    }); // create the updated favorites

    await this.create({
      userId,
      favorites
    });
  } catch (error) {
    throw error;
  }
}; // Get the favorites by their id and return the found favorites if they exist


favoritesSchema.statics.getFavoritesById = async function (id) {
  try {
    const favorites = await this.findOne({
      _id: id
    });
    if (!favorites) throw {
      error: 'No favorites with this id found'
    };
    return favorites;
  } catch (error) {
    throw error;
  }
}; // Get the favorites by their userId and return the found favorites if they exist


favoritesSchema.statics.getFavoritesByUserId = async function (userId) {
  try {
    return this.findOne({
      userId: userId
    });
  } catch (error) {
    throw error;
  }
}; // Get all user favorites in the database and return them


favoritesSchema.statics.getAllFavorites = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw error;
  }
}; // Delete favorites with the given id and return the result


favoritesSchema.statics.deleteFavoritesById = async function (id) {
  try {
    return await this.deleteOne({
      _id: id
    });
  } catch (error) {
    throw error;
  }
}; // Delete the favorites by their userId and return result


favoritesSchema.statics.deleteFavoritesByUserId = async function (userId) {
  try {
    return await this.deleteOne({
      userId: userId
    });
  } catch (error) {
    throw error;
  }
}; // Get favorites by their ids and return the found favorites


favoritesSchema.statics.getFavorites = async function (ids) {
  try {
    const favorites = await this.find({
      _id: {
        $in: ids
      }
    });
    if (!favorites) throw {
      error: 'No favorites with these ids were found'
    };
    return users;
  } catch (error) {
    throw error;
  }
};

var _default = _mongoose.default.model("UserFavorites", favoritesSchema);

exports.default = _default;
//# sourceMappingURL=UserFavorites.js.map