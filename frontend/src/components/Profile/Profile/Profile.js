import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import ProfileForm from '../ProfileForm/ProfileForm';
import Orders from '../Orders/Orders';
import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import './Profile.css';

const Profile = () => {
  const [message, setMessage] = useState(null);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  return (
    <Fragment>
      {error && <Message type='danger'>{error}</Message>}
      {message && <Message type='danger'>{message}</Message>}
      {loading ? (
        <Spinner />
      ) : (
        <div className='profile'>
          <ProfileForm setMessage={setMessage} />
          <Orders />
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
