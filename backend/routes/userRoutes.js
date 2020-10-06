import express from 'express';
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.route('/').get(protect, admin, getUsers);

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

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.route('/profile').put(protect, updateUserProfile);

export default router;
