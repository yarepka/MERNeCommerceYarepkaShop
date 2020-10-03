import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../../redux/actions/cartActions';
import Message from '../Message/Message';
import CartItem from './CartItem/CartItem';
import Card from '../Card/Card';

import './Cart.css';

const Cart = ({ match, location, history }) => {
  const productId = match.params.id;
  // get query params
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div className='cart'>
      <div>
        <h1 className='text-uppercase my-1'>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{' '}
            <Link className='btn btn-underlined text-medium' to='/'>
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
