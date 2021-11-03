import express from 'express';
// controllers
import user from '../controllers/UserController.js';
// middlewares
//import { encode } from '../auth/jwt.js';
//const jwt = require('jsonwebtoken');

const router = express.Router();
// router
//   .post('/login/:userId', encode, (req, res, next) => {
//     return res
//       .status(200)
//       .json({
//         success: true,
//         authorization: req.authToken,
//       });
//   })

export default router;
