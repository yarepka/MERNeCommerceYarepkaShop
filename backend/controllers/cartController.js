import asyncHandler from 'express-async-handler';

import Product from '../models/product.js';

// @desc    Check cart validity
// @route   POST /api/cart/checkValidity
// @access  Private
const checkValidity = asyncHandler(async (req, res) => {
  let msg = '';
  const cartItems = req.body;

  const validatedCartItems = [];
  for (let item of cartItems) {
    const product = await Product.findById(item.product);
    if (item.qty > product.countInStock) {
      msg +=
        (msg ? '\n' : '') +
        `Product quantity of \'${item.name}\' was changed from ${item.qty} to ${product.countInStock}`;
      if (product.countInStock !== 0) {
        validatedCartItems.push({ ...item, qty: product.countInStock });
      }
    } else {
      validatedCartItems.push(item);
    }
  }

  console.log('msg: ', msg);
  console.log('validatedCartItems: ', validatedCartItems);

  if (msg) {
    return res.status(200).send({
      msg: msg,
      cartItems: validatedCartItems,
    });
  }

  res.status(200).send({
    cartItems: validatedCartItems,
  });
});

export { checkValidity };
