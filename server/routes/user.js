import express from 'express';
// controllers
import user from '../controllers/UserController.js';

const router = express.Router();

// Routes for the user controller to handle
router
  .get('/', user.onGetAllUsers)
  .get('/:id', user.onGetUserById)
  .get('/email/:email', user.onGetUserByEmail)
  .put('/', user.onCreateUser)
  .put('/login/verify', user.onVerifyUser)
  .delete('/:id', user.onDeleteUserById)

export default router;
