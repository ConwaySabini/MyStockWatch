"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Userlists = _interopRequireDefault(require("../models/Userlists.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libraries
const validator = require('validator'); // models


// Export User Controller
var _default = {
  // Finds lists by their id and returns the lists on success
  onGetListsById: async (req, res) => {
    try {
      const lists = await _Userlists.default.getListsById(req.params.id);
      return res.status(200).json({
        success: true,
        lists
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Find lists with their userId and returns the lists if they exist,
  // otherwise returns an error
  onGetListsByUserId: async (req, res) => {
    try {
      // get the lists and return the lists if available
      const lists = await _Userlists.default.getListsByUserId(req.params.userId);
      return res.status(200).json({
        success: true,
        lists
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Returns a list of all lists
  onGetAllLists: async (req, res) => {
    try {
      // finds all lists and returns them if there are any lists
      const lists = await _Userlists.default.getAllLists();
      return res.status(200).json({
        success: true,
        lists
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Tries to create lists, returns the lists on success,
  // otherwise returns an error
  onCreateLists: async (req, res) => {
    try {
      let validation = true;
      const {
        userId,
        lists
      } = req.body; // Validate the data from the request

      if (!(typeof userId === 'string' || userId instanceof String)) {
        validation = false;
      } // throw error on validation failure


      if (!validation) return res.status(400).json(validation); // Find if the lists already exists

      const foundLists = await _Userlists.default.getListsByUserId(userId); // throw error if lists already exists

      if (foundLists !== null) return res.status(500).json({
        success: false,
        error: 'There is already lists for this user.'
      }); // create the lists

      const createdLists = await _Userlists.default.createUserLists(userId, lists); // return the lists and success message

      return res.status(200).json({
        success: true,
        createdLists
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Update the lists with the given userId and returns the success message on success,
  // otherwise returns an error
  onUpdateListsByUserId: async (req, res) => {
    try {
      await _Userlists.default.updateUserLists(req.body.userId, req.body.lists);
      return res.status(200).json({
        success: true,
        message: `Updated lists from user ${req.body.userId}.`
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Delete the lists with the given id and returns the success message on success,
  // otherwise returns an error
  onDeleteListsById: async (req, res) => {
    try {
      const deletedLists = await _Userlists.default.deleteListsById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted ${deletedLists.deletedCount} lists.`
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }
  },
  // Delete the lists with the given userId and returns the success message on success,
  // otherwise returns an error
  onDeleteListsByUserId: async (req, res) => {
    try {
      const deletedLists = await _Userlists.default.deleteListsByUserId(req.params.userId);
      return res.status(200).json({
        success: true,
        message: `Deleted ${deletedLists.deletedCount} lists.`
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
//# sourceMappingURL=ListsController.js.map