import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Meta from '../../components/Meta/Meta';
import Spinner from '../../components/Spinner/Spinner';
import Message from '../../components/Message/Message';
import Product from '../../components/Products/Product/Product';
import Reviews from '../../components/Reviews/Reviews/Reviews';
import CreateReviewForm from '../../components/Reviews/CreateReviewForm/CreateReviewForm';
import { listProductDetails } from '../../redux/actions/productActions';
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_CREATE_REVIEW_RESET,
} from '../../redux/actions/types';

const ProductPage = ({ match, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { success } = productCreateReview;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, success, userInfo]);

  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_DETAILS_RESET });
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    };
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message type='danger'>{error}</Message>
      ) : (
        <Fragment>
          <Meta title={product.name} />
          <button
            className='btn btn-light p-1 my-1 bg-grey block-on-mobile'
            to='/'
            onClick={(e) => history.goBack()}
          >
            Go Back
          </button>

          <Product product={product} />
          <Reviews reviews={product.reviews} />
          {userInfo ? (
            <CreateReviewForm productId={product.id} />
          ) : (
            <Message>
              Please{' '}
              <Link
                className='text-dark btn-underlined'
                to={`/login?redirect=product/${product.id}`}
              >
                Sign In
              </Link>{' '}
              to write a review
            </Message>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductPage;
