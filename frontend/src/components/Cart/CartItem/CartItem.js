import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addToCart, removeFromCart } from '../../../redux/actions/cartActions';
import './CartItem.css';

const CartItem = ({
  item: { product, countInStock, image, name, price, qty },
}) => {
  const dispatch = useDispatch();
  return (
    <div className='cart-item'>
      <img src={image} alt={name} className='rounded grid-not-stretch' />
      <Link
        style={{ color: 'var(--text-color)' }}
        className='btn grid-not-stretch'
        to={`/product/${product}`}
      >
        {name}
      </Link>
      <h4 className='grid-not-stretch'>${price}</h4>
      <div>
        <select
          value={qty}
          onChange={(e) => dispatch(addToCart(product, Number(e.target.value)))}
        >
          {[...Array(countInStock).keys()].map((el, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type='button'
          className='btn btn-light grid-not-stretch'
          onClick={() => dispatch(removeFromCart(product))}
        >
          <i className='fas fa-trash'></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
