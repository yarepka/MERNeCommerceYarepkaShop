import React from 'react';
import { Link } from 'react-router-dom';

import './OrderItem.css';

const OrderItem = ({ order }) => {
  return (
    <li className='order-list-item'>
      <img
        className='rounded order-list-item-image'
        src={order.image}
        alt={order.name}
      />
      <Link
        className='btn text-dark text-bold text-centered-on-mobile'
        to={`/product/${order.product}`}
      >
        {order.name}
      </Link>
      <div className='text-centered-on-mobile'>
        {order.qty} x ${order.price} = ${(order.qty * order.price).toFixed(2)}
      </div>
    </li>
  );
};

export default OrderItem;
