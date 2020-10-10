import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Message from '../Message/Message';
import Card from '../Card/Card';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import FormContainer from '../Form/FormContainer/FormContainer';
import Orders from '../Order/Orders/Orders';
import { createOrder } from '../../redux/actions/orderActions';

import './PlaceOrder.css';

const PlaceOrder = ({ history }) => {
  const orderCreateState = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreateState;

  if (success) {
    history.push(`/order/${order.id}`);
  }

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number(cart.itemsPrice * 0.15));
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  const {
    paymentMethod,
    shippingAddress,
    cartItems,
    shippingPrice,
    taxPrice,
    itemsPrice,
    totalPrice,
  } = cart;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        totalPrice,
        taxPrice,
        shippingPrice,
      })
    );
  };

  return (
    <Fragment>
      <div className='place-order'>
        <FormContainer type='centered'>
          <CheckoutSteps step1 step2 step3 step4 />
        </FormContainer>

        <div className='place-order-content'>
          <div>
            <ul className='steps-result'>
              <li>
                <h2 className='text-uppercase text-centered-on-mobile'>
                  Shipping
                </h2>
                <p>
                  <strong>Address: </strong>
                  {shippingAddress.address}, {shippingAddress.city},{' '}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              </li>

              <li>
                <h2 className='text-uppercase text-centered-on-mobile'>
                  Payment Method
                </h2>
                <strong>Method: </strong>
                {paymentMethod}
              </li>

              <li>
                <h2 className='text-uppercase text-centered-on-mobile'>
                  Order Items
                </h2>
                {cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <Orders orders={cartItems} />
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
                  Items: <strong>${itemsPrice}</strong>
                </li>
                <li className='flex flex-justify-content-space-between'>
                  Shipping: <strong>${shippingPrice}</strong>
                </li>
                <li className='flex flex-justify-content-space-between'>
                  Tax: <strong>${taxPrice}</strong>
                </li>
                <li className='flex flex-justify-content-space-between'>
                  Total: <strong>${totalPrice}</strong>
                </li>
                {error && (
                  <li>
                    <Message type='danger'>{error}</Message>
                  </li>
                )}
                <li>
                  <button
                    className='btn btn-dark btn-block text-uppercase'
                    disabled={cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </button>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(PlaceOrder);
