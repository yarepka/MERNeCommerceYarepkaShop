import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts, clearProduct } from '../../redux/actions/productActions';
import { PRODUCT_LIST_RESET } from '../../redux/actions/types';
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';
import ProductItem from './ProductItem/ProductItem';
import './Products.css';

const Products = () => {
  // dispatch(action()) instead passing functions object to
  // second argument of connect function from react-redux
  const dispatch = useDispatch();
  // useSelector instead of mapStateToProps
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
    dispatch(clearProduct());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      console.log('exit');
      dispatch({ type: PRODUCT_LIST_RESET });
    };
  }, []);

  return loading ? (
    <Spinner />
  ) : error ? (
    <Message type='danger'>{error}</Message>
  ) : (
    <div className='products'>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  productList: state.productList,
});

export default Products;
