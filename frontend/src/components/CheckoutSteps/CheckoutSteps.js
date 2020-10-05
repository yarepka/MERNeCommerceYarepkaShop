import React from 'react';
import { Link } from 'react-router-dom';

import './CheckoutSteps.css';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className='checkout-steps'>
      <ul>
        <li>
          {step1 ? (
            <Link to='/login' className='btn text-dark'>
              Sign In
            </Link>
          ) : (
            <button className='btn bg-white' disabled>
              Sign In
            </button>
          )}
        </li>
        <li>
          {step2 ? (
            <Link to='/shipping' className='btn text-dark'>
              Shipping
            </Link>
          ) : (
            <button className='btn bg-white' disabled>
              Shipping
            </button>
          )}
        </li>
        <li>
          {step3 ? (
            <Link to='/payment' className='btn text-dark'>
              Payment
            </Link>
          ) : (
            <button className='btn bg-white' disabled>
              Payment
            </button>
          )}
        </li>
        <li>
          {step4 ? (
            <Link to='/placeorder' className='btn text-dark'>
              Place Order
            </Link>
          ) : (
            <button className='btn bg-white' disabled>
              Place Order
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default CheckoutSteps;
