import express from 'express';
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.route('/').post(registerUser);

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', authUser);

// @desc    Get user profile by token
// @route   GET /api/users/profile
// @access  Private
router.route('/profile').get(protect, getUserProfile);

export default router;
