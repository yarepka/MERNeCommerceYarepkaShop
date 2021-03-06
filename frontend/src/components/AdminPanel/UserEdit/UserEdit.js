import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import FormContainer from '../../Form/FormContainer/FormContainer';
import FormGroup from '../../Form/FormGroup/FormGroup';
import { getUserDetails, updateUser } from '../../../redux/actions/userActions';
import {
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
} from '../../../redux/actions/types';

import './UserEdit.css';

const UserEdit = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo || !userInfo.isAdmin) history.push('/');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success, error: errorUpdate, loading: loadingUpdate } = userUpdate;

  useEffect(() => {
    if (success) {
      history.push('/admin/userlist');
      dispatch({ type: USER_UPDATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });
    }
  }, [success]);

  useEffect(() => {
    if (userInfo && (!user.name || user.id !== userId)) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ ...user, name, email, isAdmin }));
  };

  return (
    <Fragment>
      <Link
        className='btn text-dark bg-grey btn-padding block-on-mobile myb-1'
        to='/admin/userlist'
      >
        GO BACK
      </Link>
      <FormContainer type='centered'>
        <h1 className='text-uppercase text-centered-on-mobile'>Edit User</h1>
        {errorUpdate && <Message type='danger'>{errorUpdate}</Message>}
        {loading || loadingUpdate ? (
          <Spinner />
        ) : error ? (
          <Message type='danger'>{error}</Message>
        ) : (
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

            <FormGroup className='flex-row flex-align-center'>
              <label className='m-0'>Is Admin</label>
              <input
                type='checkbox'
                className='mx-1'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </FormGroup>

            <button
              type='submit'
              className='btn btn-dark text-uppercase block-on-mobile'
            >
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default withRouter(UserEdit);
