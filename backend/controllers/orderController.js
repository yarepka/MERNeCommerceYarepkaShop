// will use asyncHandler instead of wrapping the code in every
// router to the try{}catch{} block
import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';

// @desc    Create new order
// @route   PORT /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order');
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).send(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  // get order, populate user field from the users collection
  // user shold have 'name' and 'email' fields
  const order = await Order.findById(orderId).populate('user', 'name email');

  if (!order) {
    res.status(404);
    throw new Error('Order was not found');
    return;
  }

  res.status(200).send(order);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order was not found');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updatedOrder = await order.save();

  res.send(updatedOrder);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order was not found');
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.send(updatedOrder);
});

// @desc    Get current user orders page
// @route   GET /api/orders/myorders/loadPage?page=1&date=4235235&perPage=1
// @access  Private
const getMyOrdersPage = asyncHandler(async (req, res) => {
  // Get page
  const page = Number(req.query.page);
  const dateInMilliseconds = Number(req.query.date);
  const ordersPerPage = req.query.perPage
    ? Number(req.query.perPage)
    : Number(process.env.ORDERS_PER_PAGE);

  if (!page && !dateInMilliseconds) {
    res.status(400);
    throw new Error('page and date query parameters must be specified');
  }

  const dateFromMilliseconds = new Date(dateInMilliseconds);

  // Get next page products
  const orders = await Order.find({
    user: req.user._id,
    createdAt: { $lte: dateFromMilliseconds },
  })
    .sort({ createdAt: 'desc' })
    .skip((page - 1) * ordersPerPage)
    .limit(ordersPerPage);

  return res.status(200).send(orders);
});

// @desc    Get orders page
// @route   GET /api/orders/myorders/loadPage?page=1&date=4235235&perPage=1
// @access  Private/Admin
const getOrdersPage = asyncHandler(async (req, res) => {
  // Get page
  const page = Number(req.query.page);
  const dateInMilliseconds = Number(req.query.date);
  const ordersPerPage = req.query.perPage
    ? Number(req.query.perPage)
    : Number(process.env.ORDERS_PER_PAGE);

  if (!page && !dateInMilliseconds) {
    res.status(400);
    throw new Error('page and date query parameters must be specified');
  }

  const dateFromMilliseconds = new Date(dateInMilliseconds);

  // Get next page products
  const orders = await Order.find({
    createdAt: { $lte: dateFromMilliseconds },
  })
    .sort({ createdAt: 'desc' })
    .skip((page - 1) * ordersPerPage)
    .limit(ordersPerPage)
    .populate('user', 'id name');

  return res.status(200).send(orders);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.send(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getMyOrdersPage,
  getOrdersPage,
};
