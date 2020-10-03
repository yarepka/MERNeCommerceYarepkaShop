// will use asyncHandler instead of wrapping the code in every
// router to the try{}catch{} block
import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

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

export { getProducts, getProductById };
