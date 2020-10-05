import React from 'react';
import { Link } from 'react-router-dom';

import './OrderItem.css';

const OrderItem = ({ order }) => {
  return (
    <li className='order-list-item'>
      <img className='rounded' src={order.image} alt={order.name} />
      <Link
        className='btn text-dark text-bold'
        to={`/product/${order.product}`}
      >
        {order.name}
      </Link>
      <div>
        {order.qty} x ${order.price} = ${(order.qty * order.price).toFixed(2)}
      </div>
    </li>
  );
};

export default OrderItem;
