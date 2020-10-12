import express from 'express';
const router = express.Router();
import { checkValidity } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/checkValidity').post(protect, checkValidity);

export default router;
