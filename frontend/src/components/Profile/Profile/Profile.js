import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ProfileForm from '../ProfileForm/ProfileForm';
import Orders from '../Orders/Orders';
import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import './Profile.css';
import { loadMyOrdersPage } from '../../../redux/actions/orderActions';
import { ORDER_LOAD_MYORDERS_PAGE_RESET } from '../../../redux/actions/types';

const Profile = ({ history }) => {
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) history.push('/login?redirect=profile');

  const userDetails = useSelector((state) => state.userDetails);
  const { error } = userDetails;

  const orderLoadMyOrdersPage = useSelector(
    (state) => state.orderLoadMyOrdersPage
  );
  const {
    orders,
    hasMore,
    loading: loadingMyOrderPage,
    loadingPage,
    error: errorMyOrdersPage,
  } = orderLoadMyOrdersPage;

  useEffect(() => {
    loadMyOrders();
  }, [userInfo]);

  useEffect(() => {
    return () => {
      dispatch({ type: ORDER_LOAD_MYORDERS_PAGE_RESET });
    };
  }, []);

  const loadMyOrders = () => {
    if (!loadingPage) {
      dispatch(loadMyOrdersPage());
    }
  };

  return (
    <Fragment>
      {error && <Message type='danger'>{error}</Message>}
      {message && <Message type='danger'>{message}</Message>}
      {loadingMyOrderPage ? (
        <Spinner />
      ) : (
        <div className='profile'>
          <ProfileForm setMessage={setMessage} />
          <Orders
            orders={orders}
            error={errorMyOrdersPage}
            hasMore={hasMore}
            load={loadMyOrders}
          />
        </div>
      )}
    </Fragment>
  );
};

export default withRouter(Profile);
