import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../../Container/Container';
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
    <nav className='bg-dark py-2'>
      <Container>
        <Link to='/' className='btn brand'>
          Yarepka.Shop
        </Link>

        <ul>
          <li>
            <Link to='/cart' className='btn text-uppercase'>
              <i className='fas fa-shopping-cart'></i> Cart
            </Link>
          </li>
          {userInfo ? (
            [
              <li key={1}>
                <Link to='/profile' className='btn text-uppercase'>
                  <i className='fas fa-user'></i> {userInfo.name.split(' ')[0]}
                </Link>
              </li>,
              <li key={2}>
                <button
                  className='btn text-uppercase bg-dark'
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>,
            ]
          ) : (
            <li>
              <Link to='/login' className='btn text-uppercase'>
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
