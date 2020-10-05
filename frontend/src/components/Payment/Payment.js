import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../Form/FormContainer/FormContainer';
import FormGroup from '../Form/FormGroup/FormGroup';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import { savePaymentMethod } from '../../redux/actions/cartActions';

import './Payment.css';
const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer type='centered'>
      <CheckoutSteps step1 step2 step3 />
      <h1 className='text-uppercase'>Payment Method</h1>
      <form className='payment-method-form' onSubmit={submitHandler}>
        <FormGroup>
          <label className='text-medium'>Select Method</label>
          <div style={{ marginLeft: '15px' }} className='radio'>
            <input
              type='radio'
              name='paymentMethod'
              id='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='paymentMethod'>PayPal or Credit Card</label>
          </div>
        </FormGroup>

        <button type='submit' className='btn btn-dark text-uppercase'>
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default withRouter(Payment);
