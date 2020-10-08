// will use asyncHandler instead of wrapping the code in every
// router to the try{}catch{} block
import asyncHandler from 'express-async-handler';

import Product from '../models/product.js';

// @desc    Get next page with products
// @route   GET /api/products/loadPage?page=1&date=4235235&perPage=1
// @access  Public
const getProductsPage = asyncHandler(async (req, res) => {
  // Get page
  const page = parseInt(req.query.page);
  const dateInMilliseconds = parseInt(req.query.date);
  const productsPerPage = req.query.perPage
    ? parseInt(req.query.perPage)
    : parseInt(process.env.PRODUCTS_PER_PAGE);

  if (!page && !dateInMilliseconds) {
    res.status(400);
    throw new Error('page and date query parameters must be specified');
  }

  const dateFromMilliseconds = new Date(dateInMilliseconds);

  // Get next page products
  const products = await Product.find({
    createdAt: { $lte: dateFromMilliseconds },
  })
    .sort({ createdAt: 'desc' })
    .skip((page - 1) * productsPerPage)
    .limit(productsPerPage);

  return res.status(200).send(products);
});

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.status(200).send(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.status(200).send(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product was not found');
  }

  await product.remove();
  res.send({ message: 'Product removed' });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).send(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    brand,
    category,
    countInStock,
    image,
  } = req.body;

  console.log(req.body);

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = name;
  product.price = Number(price).toFixed(2);
  product.description = description;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;
  product.image = image ? image.replace('\\', '/') : product.image;

  const updatedProduct = await product.save();
  res.send(updatedProduct);
});

export {
  getProducts,
  getProductById,
  getProductsPage,
  deleteProduct,
  createProduct,
  updateProduct,
};
