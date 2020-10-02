import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../../Container/Container';
import './Navbar.css';

const Navbar = () => {
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

          <li>
            <Link to='/sign-in' className='btn text-uppercase'>
              <i className='fas fa-user'></i> Sign In
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
