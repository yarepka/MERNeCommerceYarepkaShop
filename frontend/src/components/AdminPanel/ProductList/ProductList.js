import React, { useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import {
  loadListProductsPage,
  deleteProduct,
  createProduct,
} from '../../../redux/actions/productActions';

import {
  PRODUCT_LIST_LOAD_PAGE_RESET,
  PRODUCT_DELETE_RESET,
} from '../../../redux/actions/types';

import './ProductList.css';

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const productListLoadPage = useSelector((state) => state.productListLoadPage);
  const { loading, error, products, hasMore } = productListLoadPage;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  if (!userInfo || !userInfo.isAdmin) history.push('/');
  if (successCreate) history.push(`/admin/product/${createdProduct.id}/edit`);

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_LIST_LOAD_PAGE_RESET });
    }
  }, [successDelete]);

  useEffect(() => {
    loadListProducts();
  }, [userInfo, successDelete]);

  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_LIST_LOAD_PAGE_RESET });
      dispatch({ type: PRODUCT_DELETE_RESET });
    };
  }, []);

  const deleteHandler = (productId) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(productId));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const loadListProducts = () => {
    dispatch(loadListProductsPage());
  };

  return (
    <Fragment>
      <div
        className='flex flex-column-on-mobile flex-justify-content-space-between 
      flex-align-center myb-1 products-top'
      >
        <h1 className='text-uppercase text-centered '>Products</h1>
        <button
          className='btn btn-padding bg-dark text-light text-uppercase create-product block-on-mobile'
          onClick={createProductHandler}
        >
          <i className='fas fa-plus'></i> Create Product
        </button>
      </div>
      {errorDelete && <Message type='danger'>{errorDelete}</Message>}
      {errorCreate && <Message type='danger'>{errorCreate}</Message>}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message type='danger'>{error}</Message>
      ) : (
        <InfiniteScroll hasMore={hasMore} loadMore={loadListProducts}>
          <ul className='products-list'>
            {products.map((product) => (
              <li className='products-list-item' key={product.id}>
                <ul className='product-data-list'>
                  <li className='product-data-list-item'>
                    <p>ID</p>
                    <strong>{product.id}</strong>
                  </li>

                  <li className='product-data-list-item'>
                    <p>NAME</p>
                    <strong>{product.name}</strong>
                  </li>

                  <li className='product-data-list-item'>
                    <p>PRICE</p>
                    <strong>${product.price}</strong>
                  </li>

                  <li className='product-data-list-item'>
                    <p>CATEGORY</p>
                    <strong>{product.category}</strong>
                  </li>

                  <li className='product-data-list-item'>
                    <p>BRAND</p>
                    <strong>{product.brand}</strong>
                  </li>

                  <li className='flex flex-justify-content-center  flex-align-center product-data-list-item grid-off'>
                    <img
                      src={product.image}
                      style={{ width: '500px', maxWidth: '100%' }}
                    />
                  </li>

                  <li className='product-data-list-item flex'>
                    <Link
                      className='btn bg-grey text-dark btn-padding btn-block text-centered'
                      to={`/admin/product/${product.id}/edit`}
                    >
                      <i className='fas fa-edit'></i>
                    </Link>
                    <button
                      className='btn bg-danger text-light btn-block text-centered btn-padding'
                      onClick={() => deleteHandler(product.id)}
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

export default withRouter(ProductList);
