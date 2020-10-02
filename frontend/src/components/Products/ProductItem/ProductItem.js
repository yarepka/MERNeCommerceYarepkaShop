import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../Card/Card';
import Rating from '../Rating/Rating';
import './ProductItem.css';

const ProductItem = ({
  product: {
    _id,
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    rating,
    numReviews,
  },
}) => {
  return (
    <Card className='my-1 rounded product-item'>
      <Link to={`/product/${_id}`}>
        <img src={image} />
      </Link>

      <div className='product-item-title my-1'>
        <Link to={`/product/${_id}`}>{name}</Link>
      </div>

      <div className='product-item-text'>
        <Rating value={rating} text={`${numReviews} reviews`} />
      </div>

      <h3 className='product-item-text'>${price}</h3>
    </Card>
  );
};

export default ProductItem;
