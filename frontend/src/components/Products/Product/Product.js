import React from 'react';

import Card from '../../Card/Card';
import Rating from '../Rating/Rating';
import './Product.css';

const Product = ({ product }) => {
  return (
    <div className='product'>
      <img src={product.image} />
      <ul className='product-info'>
        <li>
          <h3>{product.name}</h3>
        </li>
        <li>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </li>
        <li>Price: ${product.price}</li>
        <li>Description: {product.description}</li>
      </ul>
      <Card>
        <ul className='product-price-status-cart'>
          <li>
            <div>Price: </div>
            <div>
              <strong>${product.price}</strong>
            </div>
          </li>
          <li>
            <div>Status: </div>
            <div>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</div>
          </li>
          <li>
            <button
              className='btn btn-dark btn-block text-uppercase'
              type='button'
              disabled='disabled'
            >
              Add to cart
            </button>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Product;
