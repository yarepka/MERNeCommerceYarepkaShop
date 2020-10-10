import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../../Container/Container';
import SearchBox from '../../SearchBox/SearchBox';
import { logout } from '../../../redux/actions/userActions';
import './Navbar.css';

const Navbar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className='bg-primary py-2'>
      <Container>
        <div>
          <Link to='/' className='btn brand'>
            Yarepka.Shop
          </Link>
          <SearchBox />
        </div>
        <ul>
          <li>
            <Link to='/cart' className='btn text-uppercase bg-dark-on-mobile'>
              <i className='fas fa-shopping-cart'></i> Cart
            </Link>
          </li>
          {userInfo ? (
            [
              <li key={1}>
                <Link
                  to='/profile'
                  className='btn text-uppercase bg-dark-on-mobile'
                >
                  <i className='fas fa-user'></i> {userInfo.name.split(' ')[0]}
                </Link>
              </li>,
              userInfo.isAdmin && (
                <li key={2}>
                  <Link
                    className='btn text-uppercase bg-dark-on-mobile'
                    to='/admin/panel'
                  >
                    <i className='far fa-clipboard'></i> Admin Panel
                  </Link>
                </li>
              ),
              <li key={3}>
                <button
                  className='btn text-uppercase bg-primary bg-dark-on-mobile'
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>,
            ]
          ) : (
            <li>
              <Link
                to='/login'
                className='btn text-uppercase bg-dark-on-mobile'
              >
                <i className='fas fa-user'></i> Sign In
              </Link>
            </li>
          )}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
