import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Container from './components/Container/Container';
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ShippingPage from './pages/ShippingPage/ShippingPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage/PlaceOrderPage';
import OrderPage from './pages/OrderPage/OrderPage';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className='py-1'>
        <Container>
          <Route path='/login' component={LoginPage} exact />
          <Route path='/register' component={RegisterPage} exact />
          <Route path='/profile' component={ProfilePage} exact />
          <Route path='/shipping' component={ShippingPage} exact />
          <Route path='/payment' component={PaymentPage} exact />
          <Route path='/placeorder' component={PlaceOrderPage} exact />
          <Route path='/order/:id' component={OrderPage} exact />
          <Route path='/product/:id' component={ProductPage} exact />
          <Route path='/cart/:id?' component={CartPage} exact />
          <Route path='/' component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
