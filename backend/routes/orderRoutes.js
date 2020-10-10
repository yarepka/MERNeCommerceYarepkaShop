import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getOrdersPage,
  getMyOrdersPage,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/').get(protect, admin, getOrders);
router.route('/loadPage').get(protect, admin, getOrdersPage);
router.route('/myorders/loadPage').get(protect, getMyOrdersPage);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
