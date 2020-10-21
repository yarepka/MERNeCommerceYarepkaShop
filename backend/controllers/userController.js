// will use asyncHandler instead of wrapping the code in every
// router to the try{}catch{} block
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/user.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // find user
  const user = await User.findOne({ email });

  // check if user exists and if entered
  // password match the encrypted one
  if (user && (await user.matchPassword(password))) {
    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Register a new user
// @route   POST /api/users/login
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user with specified email already exist
  let user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error('User already exists');
  }

  // syntactical sugar for .save()
  user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).send({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile by token
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).send({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
      token: generateToken(req.user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    req.user.name = req.body.name || req.user.name;
    req.user.email = req.body.email || req.user.email;
    if (req.body.password) {
      req.user.password = req.body.password;
    }

    const updatedUser = await req.user.save();

    res.send({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get next page with users
// @route   GET /api/users/loadPage?page=1&date=4235235&perPage=1
// @access  Private/Admin
const getUsersPage = asyncHandler(async (req, res) => {
  // Get page
  const page = Number(req.query.page);
  const dateInMilliseconds = Number(req.query.date);
  const usersPerPage = req.query.perPage
    ? Number(req.query.perPage)
    : Number(process.env.PRODUCTS_PER_PAGE);

  if (!page && !dateInMilliseconds) {
    res.status(400);
    throw new Error('page and date query parameters must be specified');
  }

  const dateFromMilliseconds = new Date(dateInMilliseconds);

  // Get next page products
  const users = await User.find({
    createdAt: { $lte: dateFromMilliseconds },
  })
    .sort({ createdAt: 'desc' })
    .skip((page - 1) * usersPerPage)
    .limit(usersPerPage);

  return res.status(200).send(users);
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

// @desc    Delete user
// @route   DELETE /api/user/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.remove();
  res.send({ message: 'User removed' });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Pivate/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User was not found');
  }

  res.send(user);
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User was not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;

  const updatedUser = await user.save();

  res.send({
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  getUsersPage,
  deleteUser,
  getUserById,
  updateUser,
};
