import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../../Form/FormContainer/FormContainer';
import FormGroup from '../../Form/FormGroup/FormGroup';
import { saveShippingAddress } from '../../../redux/actions/cartActions';
import CheckoutSteps from '../../CheckoutSteps/CheckoutSteps';

import './ShippingForm.css';

const ShippingForm = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer type='centered'>
      <CheckoutSteps step1 step2 />
      <h1 className='text-uppercase text-centered-on-mobile'>Shipping</h1>
      <form onSubmit={submitHandler}>
        <FormGroup>
          <label>Address</label>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder='Enter address'
          />
        </FormGroup>

        <FormGroup>
          <label>City</label>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder='Enter city'
          />
        </FormGroup>

        <FormGroup>
          <label>Postal Code</label>
          <input
            type='text'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            placeholder='Enter postal code'
          />
        </FormGroup>

        <FormGroup>
          <label>Country</label>
          <input
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder='Enter country'
          />
        </FormGroup>

        <button
          type='submit'
          className='btn btn-dark text-uppercase block-on-mobile'
        >
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default withRouter(ShippingForm);
