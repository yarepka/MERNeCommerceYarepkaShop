import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// @desc    Create new order
// @route   PORT /api/orders
// @access  Private
router.route('/').post(protect, addOrderItems);

export default router;
