import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CART_VALIDITY_RESET } from '../../redux/actions/types';
import { addToCart, checkValidity } from '../../redux/actions/cartActions';
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';
import CartItem from './CartItem/CartItem';
import Card from '../Card/Card';

import './Cart.css';

const Cart = ({ match, location, history }) => {
  const productId = match.params.id;
  // get query params
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems, valid, msg, error } = cart;

  if (valid) history.push('/shipping');

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  useEffect(() => {
    return () => {
      dispatch({ type: CART_VALIDITY_RESET });
    };
  }, []);

  const checkoutHandler = () => {
    if (!userInfo) {
      history.push('/login?redirect=cart');
    } else {
      dispatch(checkValidity(cartItems));
    }
  };

  return (
    <div className='cart'>
      <div>
        <h1 className='text-uppercase myb-1 text-centered-on-mobile'>
          Shopping Cart
        </h1>
        {error && <Message type='danger'>{error}</Message>}
        {msg && <Message type='info'>{msg}</Message>}
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{' '}
            <Link
              style={{ color: '#333' }}
              className='btn btn-underlined text-medium'
              to='/'
            >
              Go Back
            </Link>
          </Message>
        ) : (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.product} item={cartItem} />
          ))
        )}
      </div>
      <div>
        <Card className='p-0'>
          <ul>
            <li>
              <h3 className='text-uppercase text-centered'>
                Subtotal (
                {cartItems.reduce((acc, item) => {
                  return acc + item.qty;
                }, 0)}
                ) items
              </h3>
            </li>
            <li className='flex flex-justify-content-space-between'>
              <div>Total: </div>
              <div>
                <strong>
                  $
                  {cartItems
                    .reduce((acc, item) => {
                      return acc + item.qty * item.price;
                    }, 0)
                    .toFixed(2)}
                </strong>
              </div>
            </li>
            <li>
              <button
                className='btn btn-dark btn-block text-uppercase '
                type='button'
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </button>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(Cart);
