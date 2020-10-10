// will use asyncHandler instead of wrapping the code in every
// router to the try{}catch{} block
import asyncHandler from 'express-async-handler';

import Product from '../models/product.js';

// @desc    Get next page with products
// @route   GET /api/products/loadPage?page=1&date=4235235&keyword=''&perPage=1
// @access  Public
const getProductsPage = asyncHandler(async (req, res) => {
  // Get page
  const page = Number(req.query.page);
  const dateInMilliseconds = Number(req.query.date);
  const productsPerPage = req.query.perPage
    ? Number(req.query.perPage)
    : Number(process.env.PRODUCTS_PER_PAGE);
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // case insensetive
        },
      }
    : {};

  if (!page && !dateInMilliseconds) {
    res.status(400);
    throw new Error('page and date query parameters must be specified');
  }

  const dateFromMilliseconds = new Date(dateInMilliseconds);

  // Get next page products
  const products = await Product.find({
    ...keyword,
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
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // case insensetive
        },
      }
    : {};

  const products = await Product.find({ ...keyword });

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

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // check if the product was already reviewed by current user
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.numReviews;

  await product.save();
  res.status(201).send({ message: 'Review added' });
});

export {
  getProducts,
  getProductById,
  getProductsPage,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
