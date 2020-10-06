import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProfileForm from '../ProfileForm/ProfileForm';
import Orders from '../Orders/Orders';
import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import './Profile.css';
import { listMyOrders } from '../../../redux/actions/orderActions';

const Profile = () => {
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error } = userDetails;

  const orderListMyOrders = useSelector((state) => state.orderListMyOrders);
  const {
    orders,
    loading: loadingMyOrders,
    error: errorMyOrders,
  } = orderListMyOrders;

  useEffect(() => {
    dispatch(listMyOrders());
  }, []);

  return (
    <Fragment>
      {error && <Message type='danger'>{error}</Message>}
      {message && <Message type='danger'>{message}</Message>}
      {loading || loadingMyOrders ? (
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
