import React from 'react';
import { Link } from 'react-router-dom';

import Message from '../../Message/Message';

import './Orders.css';

const Orders = ({ orders, error }) => {
  return (
    <div className='orders'>
      <h2 className='text-uppercase'>My Orders</h2>
      {error && <Message type='danger'>{error}</Message>}
      {orders.length === 0 ? (
        <Message>You have no orders</Message>
      ) : (
        <ul className='profile-orders-list'>
          {orders.map((order) => (
            <li className='profile-orders-list-item' key={order.id}>
              <ul className='profile-orders-list-item-data-list'>
                <li>
                  <p>ID:</p>
                  <strong>{order.id}</strong>
                </li>

                <li>
                  <p>DATE:</p>
                  <strong>{order.createdAt.substring(0, 10)}</strong>
                </li>

                <li>
                  <p>TOTAL:</p>
                  <strong>{order.totalPrice}</strong>
                </li>

                <li>
                  <p>PAID:</p>
                  <strong>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </strong>
                </li>

                <li>
                  <p>DELIVERED:</p>
                  <strong>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </strong>
                </li>
                <li>
                  <p>DETAILS:</p>
                  <div>
                    <Link
                      className='btn text-dark bg-grey btn-padding text-uppercase btn-block text-centered'
                      to={`/order/${order.id}`}
                    >
                      DETAILS
                    </Link>
                  </div>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
