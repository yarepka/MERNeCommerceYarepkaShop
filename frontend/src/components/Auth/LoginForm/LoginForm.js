import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import FormContainer from '../../Form/FormContainer/FormContainer';
import FormGroup from '../../Form/FormGroup/FormGroup';
import { login } from '../../../redux/actions/userActions';

import './LoginForm.css';

const LoginForm = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  if (userInfo) {
    history.push(redirect);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer type='centered'>
      <h1 className='text-uppercase'>Sign In</h1>
      {error && <Message type='danger'>{error}</Message>}
      {loading && <Spinner width='250' />}
      <form onSubmit={submitHandler}>
        <FormGroup>
          <label>Email Address</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
          />
        </FormGroup>

        <FormGroup>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
          />
        </FormGroup>

        <button type='submit' className='btn btn-dark text-uppercase'>
          Sign In
        </button>

        <div className='my-1'>
          New Customer?{' '}
          <Link
            style={{ color: '#333' }}
            className='btn btn-underlined text-underlined'
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
            Register
          </Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default withRouter(LoginForm);
