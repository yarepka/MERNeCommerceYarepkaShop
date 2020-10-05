import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import FormContainer from '../../Form/FormContainer/FormContainer';
import FormGroup from '../../Form/FormGroup/FormGroup';
import { register } from '../../../redux/actions/userActions';

import './RegisterForm.css';

const RegisterForm = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  if (userLogin.userInfo) {
    history.push('/');
  }

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer type='centered'>
      <h1 className='text-uppercase'>Sign Up</h1>
      {message && <Message type='danger'>{message}</Message>}
      {error && <Message type='danger'>{error}</Message>}
      {loading && <Spinner width='250' />}
      <form onSubmit={submitHandler}>
        <FormGroup>
          <label>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter name'
          />
        </FormGroup>

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

        <FormGroup>
          <label>Confirm Password</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm password'
          />
        </FormGroup>

        <button type='submit' className='btn btn-dark text-uppercase'>
          Register
        </button>

        <div className='my-1'>
          Already have an account?{' '}
          <Link
            style={{ color: '#333' }}
            className='btn btn-underlined text-underlined'
            to='/login'
          >
            Login
          </Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default withRouter(RegisterForm);
