import React, { useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import { loadListOrdersPage } from '../../../redux/actions/orderActions';
import { ORDER_LIST_LOAD_PAGE_RESET } from '../../../redux/actions/types';

import './OrderList.css';

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo || !userInfo.isAdmin) history.push('/');

  const orderListLoadPage = useSelector((state) => state.orderListLoadPage);
  const { loading, orders, error, hasMore } = orderListLoadPage;

  useEffect(() => {
    loadListOrders();
  }, [userInfo]);

  useEffect(() => {
    return () => {
      dispatch({ type: ORDER_LIST_LOAD_PAGE_RESET });
    };
  }, []);

  const loadListOrders = () => {
    dispatch(loadListOrdersPage());
  };

  return (
    <Fragment>
      <h1 className='text-uppercase text-centered myb-1'>Orders</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message type='danger'>{error}</Message>
      ) : (
        <InfiniteScroll hasMore={hasMore} loadMore={loadListOrders}>
          <ul className='ordersAdmin-list'>
            {orders.map((order) => (
              <li className='ordersAdmin-list-item' key={order.id}>
                <ul className='orderAdmin-data-list'>
                  <li className='orderAdmin-data-list-item'>
                    <p>ID</p>
                    <strong>{order.id}</strong>
                  </li>

                  <li className='orderAdmin-data-list-item'>
                    <p>USER</p>
                    <strong>{order.user && order.user.name}</strong>
                  </li>

                  <li className='orderAdmin-data-list-item'>
                    <p>DATE</p>
                    <strong>{order.createdAt.substring(0, 10)}</strong>
                  </li>

                  <li className='orderAdmin-data-list-item'>
                    <p>TOTAL</p>
                    <strong>${order.totalPrice}</strong>
                  </li>

                  <li className='orderAdmin-data-list-item'>
                    <p>PAID</p>
                    <strong>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'var(--danger-color-contrast)' }}
                        ></i>
                      )}
                    </strong>
                  </li>

                  <li className='orderAdmin-data-list-item'>
                    <p>DELIVERED</p>
                    <strong>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'var(--danger-color-contrast)' }}
                        ></i>
                      )}
                    </strong>
                  </li>

                  <li className='orderAdmin-data-list-item'>
                    <p>DETAILS</p>
                    <div>
                      <Link
                        className='btn bg-grey text-dark btn-padding btn-block text-centered'
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
        </InfiniteScroll>
      )}
    </Fragment>
  );
};

export default withRouter(OrderList);
