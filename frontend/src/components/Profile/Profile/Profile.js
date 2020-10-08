import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProfileForm from '../ProfileForm/ProfileForm';
import Orders from '../Orders/Orders';
import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import './Profile.css';
import { listMyOrders } from '../../../redux/actions/orderActions';
import { ORDER_LIST_MYORDERS_RESET } from '../../../redux/actions/types';

const Profile = () => {
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error } = userDetails;

  const orderListMyOrders = useSelector((state) => state.orderListMyOrders);
  const {
    orders,
    loading: loadingMyOrders,
    error: errorMyOrders,
  } = orderListMyOrders;

  useEffect(() => {
    console.log('list');
    dispatch(listMyOrders());
    return () => {
      dispatch({ type: ORDER_LIST_MYORDERS_RESET });
    };
  }, []);

  return (
    <Fragment>
      {error && <Message type='danger'>{error}</Message>}
      {message && <Message type='danger'>{message}</Message>}
      {loadingMyOrders ? (
        <Spinner />
      ) : (
        <div className='profile'>
          <ProfileForm setMessage={setMessage} />
          <Orders orders={orders} error={errorMyOrders} />
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
