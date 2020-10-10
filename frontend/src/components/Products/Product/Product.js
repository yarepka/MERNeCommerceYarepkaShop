import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../../Card/Card';
import Rating from '../Rating/Rating';
import './Product.css';

const Product = ({ product, match, history }) => {
  const [qty, setQty] = useState(1);

  const addToCardHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <div className='product'>
      <img className='product-image' src={product.image} />
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
      <Card className='p-0 product-price-info'>
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
          {product.countInStock > 0 && (
            <li className='flex-align-center'>
              <div>Qty</div>
              <div>
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((el, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          )}
          <li>
            <button
              onClick={addToCardHandler}
              type='button'
              className='btn btn-dark btn-block text-uppercase'
              disabled={!product.countInStock > 0}
            >
              Add to cart
            </button>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default withRouter(Product);
