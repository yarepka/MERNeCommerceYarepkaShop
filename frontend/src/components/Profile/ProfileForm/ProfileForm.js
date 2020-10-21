import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../../Form/FormContainer/FormContainer';
import FormGroup from '../../Form/FormGroup/FormGroup';
import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import {
  getUserDetails,
  updateUserProfile,
} from '../../../redux/actions/userActions';
import {
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
} from '../../../redux/actions/types';

import './ProfileForm.css';

const ProfileForm = ({ history, setMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log('ProfileForm userInfo: ', userInfo);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, user]);

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  }, [success]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      dispatch(updateUserProfile({ name, email, password }));
    }
  };

  return (
    <FormContainer>
      <h2 className='text-uppercase text-centered-on-mobile'>User Profile</h2>
      {success && (
        <Message type='success' size='small'>
          Profile updated
        </Message>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <form className='profile-form' onSubmit={submitHandler}>
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

          <button
            type='submit'
            className='btn btn-dark btn-block text-uppercase'
          >
            Update
          </button>
        </form>
      )}
    </FormContainer>
  );
};

export default withRouter(ProfileForm);
