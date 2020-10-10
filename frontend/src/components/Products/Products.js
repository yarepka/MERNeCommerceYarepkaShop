import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import { loadProductsPage } from '../../redux/actions/productActions';
import { PRODUCT_LOAD_PAGE_RESET } from '../../redux/actions/types';
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';
import ProductItem from './ProductItem/ProductItem';
import './Products.css';

const Products = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const productLoadPage = useSelector((state) => state.productLoadPage);
  const { loading, error, products, hasMore } = productLoadPage;

  console.log(`[Products.js]: rendering`);

  useEffect(() => {
    return () => {
      console.log(`[Products.js]: ${PRODUCT_LOAD_PAGE_RESET} action dispatch`);
      dispatch({ type: PRODUCT_LOAD_PAGE_RESET });
    };
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    console.log(`[Products.js]: loadProducts\npage=${productLoadPage.page}`);
    dispatch(loadProductsPage(keyword));
  };

  const productItems = products.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));

  console.log(`[Products.js]: before return`);
  return loading ? (
    <Spinner />
  ) : error ? (
    <Message type='danger'>{error}</Message>
  ) : (
    <InfiniteScroll
      className='products'
      hasMore={hasMore}
      loadMore={loadProducts}
    >
      {productItems}
    </InfiniteScroll>
  );
};

export default withRouter(Products);
