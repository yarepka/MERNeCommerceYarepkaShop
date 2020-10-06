import React from 'react';

import OrderItem from '../OrderItem/OrderItem';
import './Orders.css';

const Orders = ({ orders }) => {
  return (
    <ul className='orders-list'>
      {orders.map((order) => (
        <OrderItem key={order.product} order={order} />
      ))}
    </ul>
  );
};

export default Orders;
