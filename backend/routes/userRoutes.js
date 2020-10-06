import express from 'express';
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
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

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Pivate/Admin
router.route('/:id').get(protect, admin, getUserById);

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
router.route('/:id').put(protect, admin, updateUser);

// @desc    Delete user
// @route   DELETE /api/user/:id
// @access  Private/Admin
router.route('/:id').delete(protect, admin, deleteUser);

export default router;
