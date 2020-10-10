import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './AdminPanel.css';

const AdminPanel = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo || !userInfo.isAdmin) history.push('/');

  return (
    <Fragment>
      <h1 className='text-uppercase text-centered myb-1'>Admin Panel</h1>
      <ul className='admin-panel'>
        <li>
          <p>Users List</p>
          <div>
            <Link
              className='btn btn-block btn-padding bg-grey text-dark text-centered'
              to='/admin/userlist'
            >
              Users
            </Link>
          </div>
        </li>
        <li>
          <p>Products list</p>
          <div>
            <Link
              className='btn btn-block btn-padding bg-grey text-dark text-centered'
              to='/admin/productlist'
            >
              Products
            </Link>
          </div>
        </li>
        <li>
          <p>Orders list</p>
          <div>
            <Link
              className='btn btn-block btn-padding bg-grey text-dark text-centered'
              to='/admin/orderlist'
            >
              Orders
            </Link>
          </div>
        </li>
      </ul>
    </Fragment>
  );
};

export default withRouter(AdminPanel);
