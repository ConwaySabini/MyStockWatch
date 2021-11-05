"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserFavorites = _interopRequireDefault(require("../models/UserFavorites.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libraries
const validator = require('validator'); // models


// Export User Controller
var _default = {
  // Finds favorites by their id and returns the favorites on success
  onGetFavoritesById: async (req, res) => {
    try {
      const favorites = await _UserFavorites.default.getfavoritesById(req.params.id);
      return res.status(200).json({
        success: true,
        favorites
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Find favorites with their userId and returns the favorites if they exist,
  // otherwise returns an error
  onGetFavoritesByUserId: async (req, res) => {
    try {
      // get the favorites and return the favorites if available
      const favorites = await _UserFavorites.default.getFavoritesByUserId(req.params.userId);
      return res.status(200).json({
        success: true,
        favorites
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Returns a list of all favorites
  onGetAllFavorites: async (req, res) => {
    try {
      // finds all favorites and returns them if there are any favorites
      const favorites = await _UserFavorites.default.getAllFavorites();
      return res.status(200).json({
        success: true,
        favorites
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Tries to create favorites, returns the favorites on success,
  // otherwise returns an error
  onCreateFavorites: async (req, res) => {
    try {
      let validation = true;
      const {
        userId,
        favorites
      } = req.body; // Validate the data from the request

      if (!(typeof userId === 'string' || userId instanceof String)) {
        validation = false;
      } // throw error on validation failure


      if (!validation) return res.status(400).json(validation); // Find if the favorites already exists

      const foundFavorites = await _UserFavorites.default.getFavoritesByUserId(userId); // throw error if favorites already exists

      if (foundFavorites !== null) return res.status(500).json({
        success: false,
        error: 'There is already favorites for this user.'
      }); // create the favorites

      const createdFavorites = await _UserFavorites.default.createUserFavorites(userId, favorites); // return the favorites and success message

      return res.status(200).json({
        success: true,
        createdFavorites
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Update the favorites with the given userId and returns the success message on success,
  // otherwise returns an error
  onUpdateFavoritesByUserId: async (req, res) => {
    try {
      await _UserFavorites.default.updateUserFavorites(req.body.userId, req.body.favorites);
      return res.status(200).json({
        success: true,
        message: `Updated favorites from user ${req.body.userId}.`
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Delete the favorites with the given id and returns the success message on success,
  // otherwise returns an error
  onDeleteFavoritesById: async (req, res) => {
    try {
      const deletedFavorites = await _UserFavorites.default.deleteFavoritesById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted ${deletedFavorites.deletedCount} favorites.`
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Delete the favorites with the given userId and returns the success message on success,
  // otherwise returns an error
  onDeleteFavoritesByUserId: async (req, res) => {
    try {
      const deletedFavorites = await _UserFavorites.default.deleteFavoritesByUserId(req.params.userId);
      return res.status(200).json({
        success: true,
        message: `Deleted ${deletedFavorites.deletedCount} favorites.`
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
//# sourceMappingURL=FavoritesController.js.map