// utils
import makeValidation from '@withvoid/make-validation';
// models
import UserModel, { USER_TYPES } from '../models/UserModel.js';

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },

  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },

  onGetUserByEmail: async (req, res) => {
    try {
      const user = await UserModel.getUserByEmail(req.params.email);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },

  onCreateUser: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          firstName: { type: types.string },
          lastName: { type: types.string },
          type: { type: types.enum, options: { enum: USER_TYPES } },
          email: { type: types.string },
          password: { type: types.string },
        }
      }));
      if (!validation.success) return res.status(400).json(validation);
      const { firstName, lastName, type, email, password } = req.body;
      const found = await UserModel.getUserByEmail(email);
      if ((found !== null)) return res.status(500).json({ success: false, error: 'There is already an account associated with this email.' })
      const user = await UserModel.createUser(firstName, lastName, type, email, password);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },

  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },

  onVerifyUser: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          email: { type: types.string },
          password: { type: types.string },
        }
      }));
      const { email, password } = req.body;
      const isEmail = email.includes('@');
      if (!validation.success || !isEmail) return res.status(400).json(validation);
      const user = await UserModel.verifyPassword(email, password);
      if (user) return res.status(200).json({ success: true, id: user._id });
      else return res.status(500).json({ success: false, error: 'Password is incorrect.' })
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  }
}
