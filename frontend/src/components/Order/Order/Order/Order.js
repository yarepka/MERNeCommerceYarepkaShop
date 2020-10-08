import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Spinner from '../../../Spinner/Spinner';
import Message from '../../../Message/Message';
import Card from '../../../Card/Card';
import Orders from '../../Orders/Orders';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../../../../redux/actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../../../../redux/actions/types';

import './Order.css';

const Order = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  if (!userInfo) history.push('/login');
  if (userInfo && !userInfo.isAdmin) {
    if (order && order.user.id !== userInfo.id) {
      console.log('order: ', order);
      console.log('order.user: ', order.user);
      console.log('userInfo.id: ', userInfo.id);
      history.push('/');
    }
  }

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order.id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderId, successPay, successDeliver]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order.id));
  };

  return loading ? (
    <Spinner />
  ) : error ? (
    <Message type='danger'>{error}</Message>
  ) : (
    <Fragment>
      <h1 className='text-uppercase my-2'>Order {order.id}</h1>
      <div className='order'>
        <div className='order-content'>
          <div>
            <ul className='steps-result'>
              <li>
                <h2 className='text-uppercase'>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}{' '}
                </p>
                <p className='my-2'>
                  <strong>Email: </strong>
                  <a
                    className='btn btn-underlined text-dark'
                    href={`mailto:${order.user.email}`}
                  >
                    {order.user.email}
                  </a>
                </p>
                <p className='myb-1'>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message type='success'>
                    Delivered at {order.deliveredAt}
                  </Message>
                ) : (
                  <Message type='danger'>Not Delivered</Message>
                )}
              </li>

              <li>
                <h2 className='text-uppercase'>Payment Method</h2>
                <p className='myb-1'>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message type='success'>Paid at {order.paidAt}</Message>
                ) : (
                  <Message type='danger'>Not Paid</Message>
                )}
              </li>

              <li>
                <h2 className='text-uppercase'>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <Orders orders={order.orderItems} />
                )}
              </li>
            </ul>
          </div>

          <div>
            <Card className='p-0'>
              <ul className='order-summary'>
                <li>
                  <h2 className='text-uppercase text-centered'>
                    Order Summary
                  </h2>
                </li>
                <li className='flex flex-justify-content-space-between'>
                  Items:{' '}
                  <strong>
                    ${order.totalPrice - order.taxPrice - order.shippingPrice}
                  </strong>
                </li>
                <li className='flex flex-justify-content-space-between'>
                  Shipping: <strong>${order.shippingPrice}</strong>
                </li>
                <li className='flex flex-justify-content-space-between'>
                  Tax: <strong>${order.taxPrice}</strong>
                </li>
                <li className='flex flex-justify-content-space-between'>
                  Total: <strong>${order.totalPrice}</strong>
                </li>
                {!order.isPaid && (
                  <li>
                    {loadingPay && <Spinner />}
                    {!sdkReady ? (
                      <Spinner />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </li>
                )}

                {userInfo && order.isPaid && !order.isDelivered && userInfo.isAdmin && (
                  <li>
                    <button
                      type='button'
                      className='btn btn-padding btn-block text-uppercase bg-dark text-light'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </button>
                  </li>
                )}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Order);
