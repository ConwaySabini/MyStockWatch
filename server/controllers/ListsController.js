// libraries
const validator = require('validator');
// models
import UserLists from '../models/UserLists.js';

// Export User Controller
export default {
  // Finds lists by their id and returns the lists on success
  onGetListsById: async (req, res) => {
    try {
      const lists = await UserLists.getListsById(req.params.id);
      return res.status(200).json({ success: true, lists });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Find lists with their userId and returns the lists if they exist,
  // otherwise returns an error
  onGetListsByUserId: async (req, res) => {
    try {
      // get the lists and return the lists if available
      const lists = await UserLists.getListsByUserId(req.params.userId);
      return res.status(200).json({ success: true, lists });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Returns a list of all lists
  onGetAllLists: async (req, res) => {
    try {
      // finds all lists and returns them if there are any lists
      const lists = await UserLists.getAllLists();
      return res.status(200).json({ success: true, lists });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Tries to create lists, returns the lists on success,
  // otherwise returns an error
  onCreateLists: async (req, res) => {
    try {
      let validation = true;
      const { userId, lists } = req.body;
      // Validate the data from the request
      if (!(typeof userId === 'string' || userId instanceof String)) {
        validation = false;
      }
      // throw error on validation failure
      if (!validation) return res.status(400).json(validation);
      // Find if the lists already exists
      const foundLists = await UserLists.getListsByUserId(userId);
      // throw error if lists already exists
      if ((foundLists !== null)) return res.status(500).json({
        success: false,
        error: 'There is already lists for this user.'
      });
      // create the lists
      const createdLists = await UserLists.createUserLists(
        userId,
        lists
      );
      // return the lists and success message
      return res.status(200).json({ success: true, createdLists });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Update the lists with the given userId and returns the success message on success,
  // otherwise returns an error
  onUpdateListsByUserId: async (req, res) => {
    try {
      await UserLists.updateUserLists(req.body.userId, req.body.lists);
      return res.status(200).json({
        success: true,
        message: `Updated lists from user ${req.body.userId}.`
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Delete the lists with the given id and returns the success message on success,
  // otherwise returns an error
  onDeleteListsById: async (req, res) => {
    try {
      const deletedLists = await UserLists.deleteListsById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted ${deletedLists.deletedCount} lists.`
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Delete the lists with the given userId and returns the success message on success,
  // otherwise returns an error
  onDeleteListsByUserId: async (req, res) => {
    try {
      const deletedLists = await UserLists.deleteListsByUserId(req.params.userId);
      return res.status(200).json({
        success: true,
        message: `Deleted ${deletedLists.deletedCount} lists.`
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
}
