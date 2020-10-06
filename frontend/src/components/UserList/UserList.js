import React, { useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import { listUsers, deleteUser } from '../../redux/actions/userActions';

import './UserList.css';

const UserList = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  if (!userInfo || !userInfo.isAdmin) history.push('/');

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete, userInfo]);

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <Fragment>
      <h1 className='text-uppercase text-centered myb-1'>Users</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message type='danger'>{error}</Message>
      ) : (
        <ul className='users-list'>
          {users.map((user) => (
            <li className='users-list-item' key={user.id}>
              <ul className='user-data-list'>
                <li className='user-data-list-item'>
                  <p>ID</p>
                  <strong>{user.id}</strong>
                </li>

                <li className='user-data-list-item'>
                  <p>NAME</p>
                  <strong>{user.name}</strong>
                </li>

                <li className='user-data-list-item'>
                  <p>EMAIL</p>
                  <strong>
                    <a
                      className='btn text-underlined text-dark'
                      href={`mailto:${user.email}`}
                    >
                      {user.email}
                    </a>
                  </strong>
                </li>

                <li className='user-data-list-item'>
                  <p>ADMIN</p>
                  <strong>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'var(--success-color-contrast)' }}
                      ></i>
                    ) : (
                      <i
                        className='fas fa-times'
                        style={{ color: 'var(--danger-color-contrast)' }}
                      ></i>
                    )}
                  </strong>
                </li>

                <li className='user-data-list-item'>
                  <div>
                    <Link
                      className='btn bg-grey text-dark btn-padding btn-block text-centered'
                      to={`/admin/user/${user.id}/edit`}
                    >
                      <i className='fas fa-edit'></i>
                    </Link>
                  </div>
                  <div>
                    <button
                      className='btn bg-danger text-light btn-block text-centered btn-padding'
                      onClick={() => deleteHandler(user.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </div>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default withRouter(UserList);
