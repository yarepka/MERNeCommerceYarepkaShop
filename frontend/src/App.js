import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

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
import UserListPage from './pages/AdminPages/UserListPage/UserListPage';
import AdminPanelPage from './pages/AdminPages/AdminPanelPage/AdminPanel';
import UserEditPage from './pages/AdminPages/UserEditPage/UserEditPage';
import ProductListPage from './pages/AdminPages/ProductListPage/ProductListPage';
import ProductEditPage from './pages/AdminPages/ProductEditPage/ProductEditPage';
import OrderListPage from './pages/AdminPages/OrderListPage/OrderListPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className='py-1'>
        <Container>
          <Switch>
            <Route path='/login' component={LoginPage} exact />
            <Route path='/register' component={RegisterPage} exact />
            <Route path='/profile' component={ProfilePage} exact />
            <Route path='/shipping' component={ShippingPage} exact />
            <Route path='/payment' component={PaymentPage} exact />
            <Route path='/placeorder' component={PlaceOrderPage} exact />
            <Route path='/admin/panel' component={AdminPanelPage} />
            <Route path='/admin/userlist' component={UserListPage} exact />
            <Route
              path='/admin/productlist'
              component={ProductListPage}
              exact
            />
            <Route path='/admin/orderlist' component={OrderListPage} exact />
            <Route path='/admin/user/:id/edit' component={UserEditPage} exact />
            <Route
              path='/admin/product/:id/edit'
              component={ProductEditPage}
              exact
            />
            <Route path='/order/:id' component={OrderPage} exact />
            <Route path='/product/:id' component={ProductPage} exact />
            <Route path='/cart/:id?' component={CartPage} exact />

            <Route
              path='/search/:keyword'
              component={(props) => (
                <HomePage {...props} key={window.location.pathname} />
              )}
            />

            <Route path='/' component={HomePage} exact />
            <Route path='/' component={NotFoundPage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
