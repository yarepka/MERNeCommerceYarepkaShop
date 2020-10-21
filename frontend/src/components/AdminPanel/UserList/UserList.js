import React, { useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import {
  loadListUsersPage,
  deleteUser,
} from '../../../redux/actions/userActions';
import {
  USER_LIST_LOAD_PAGE_RESET,
  USER_DELETE_RESET,
} from '../../../redux/actions/types';

import './UserList.css';

const UserList = ({ history }) => {
  const dispatch = useDispatch();

  const userListLoadPage = useSelector((state) => state.userListLoadPage);
  const { loading, loadingPage, users, error, hasMore } = userListLoadPage;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  if (!userInfo || !userInfo.isAdmin) history.push('/');

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: USER_LIST_LOAD_PAGE_RESET });
      dispatch({ type: USER_DELETE_RESET });
      loadListUsers();
    }
  }, [successDelete]);

  useEffect(() => {
    loadListUsers();
  }, [userInfo]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_LIST_LOAD_PAGE_RESET });
      dispatch({ type: USER_DELETE_RESET });
    };
  }, []);

  const loadListUsers = () => {
    if (!loadingPage) {
      dispatch(loadListUsersPage());
    }
  };

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
        <InfiniteScroll hasMore={hasMore} loadMore={loadListUsers}>
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

                  <li className='user-data-list-item flex'>
                    <Link
                      className='btn bg-grey text-dark btn-padding btn-block text-centered'
                      to={`/admin/user/${user.id}/edit`}
                    >
                      <i className='fas fa-edit'></i>
                    </Link>
                    <button
                      className='btn bg-danger text-light btn-block text-centered btn-padding'
                      onClick={() => deleteHandler(user.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </Fragment>
  );
};

export default withRouter(UserList);
