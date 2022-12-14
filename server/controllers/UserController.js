// libraries
const validator = require('validator');
// models
import User, { USER_TYPES } from '../models/User.js';

// Export User Controller
export default {
  // Finds a user by their id and returns the user on success
  onGetUserById: async (req, res) => {
    try {
      const user = await User.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Finds a user by their userId and returns the user on success
  onGetUserByUserId: async (req, res) => {
    try {
      const user = await User.getUserByUserId(req.params.userId);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Finds a user with their email and returns the user if they exist, 
  // otherwise returns an error
  onGetUserByEmail: async (req, res) => {
    try {
      // get the user and return the user if available
      const user = await User.getUserByEmail(req.params.email);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Returns a list of all users
  onGetAllUsers: async (req, res) => {
    try {
      // finds all users and returns them if there are any users
      const users = await User.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Tries to create a user, returns the user on success, 
  // otherwise returns an error
  onCreateUser: async (req, res) => {
    try {
      let validation = true;
      const { userId, firstName, lastName, type, email, password, } = req.body;
      // Validate the data from the request
      if (!(typeof userId === 'string' || userId instanceof String)) {
        validation = false;
      }
      if (!(validator.isEmail(email))) {
        validation = false;
      }
      if (!(typeof password === 'string' || password instanceof String)) {
        validation = false;
      }
      if (!(typeof firstName === 'string' || firstName instanceof String)) {
        validation = false;
      }
      if (!(typeof lastName === 'string' || lastName instanceof String)) {
        validation = false;
      }
      if (!(type === USER_TYPES.ADMIN || type === USER_TYPES.CONSUMER)) {
        validation = false;
      }
      // throw error on validation failure
      if (!validation) return res.status(400).json(validation);
      // Find if the user already exists
      const found = await User.getUserByEmail(email);
      // throw error if user already exists
      if ((found !== null)) return res.status(500).json({
        success: false,
        error: 'There is already an account associated with this email.'
      });
      // create the user
      const user = await User.createUser(
        userId,
        firstName,
        lastName,
        type,
        email,
        password
      );
      // return the user and success message
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Delete the user with the given id and returns the success message on success,
  // otherwise returns an error
  onDeleteUserById: async (req, res) => {
    try {
      const user = await User.deleteUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Verify the user with the email and password
  onVerifyUser: async (req, res) => {
    try {
      let validation = true;
      const { email, password } = req.body;
      // Validate the data from the request
      if (!(validator.isEmail(email))) {
        validation = false;
      }
      if (!(typeof password === 'string' || password instanceof String)) {
        validation = false;
      }
      // throw error on validation failure
      if (!validation) return res.status(400).json(validation);
      // Verify the user email and password
      const user = await User.verifyPassword(email, password);
      if (user) return res.status(200).json({ success: true, id: user._id });
      else return res.status(500).json({ success: false, error: 'Password is incorrect.' })
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
}
