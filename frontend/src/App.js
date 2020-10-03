import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Container from './components/Container/Container';
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className='py-1'>
        <Container>
          <Route path='/' component={HomePage} exact />
          <Route path='/product/:id' component={ProductPage} exact />
          <Route path='/cart/:id?' component={CartPage} exact />
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
