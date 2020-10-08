import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  getProductsPage,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route('/').get(getProducts);

// @desc    Get next page with products
// @route   GET /api/products/loadPage?page=1&date=4235235&perPage=1
// @access  Public
router.route('/loadPage').get(getProductsPage);

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.route('/').post(protect, admin, createProduct);

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.route('/:id').put(protect, admin, updateProduct);

// @desc    Deleta a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.route('/:id').delete(protect, admin, deleteProduct);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.route('/:id').get(getProductById);

export default router;
