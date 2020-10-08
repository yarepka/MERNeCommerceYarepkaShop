import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner';
import Message from '../../components/Message/Message';
import Product from '../../components/Products/Product/Product';
import { listProductDetails } from '../../redux/actions/productActions';
import { CLEAR_PRODUCT } from '../../redux/actions/types';

const ProductPage = ({ match }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    return () => {
      dispatch({ type: CLEAR_PRODUCT });
    };
  }, [match]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message type='danger'>{error}</Message>
      ) : (
        <Fragment>
          <Link className='btn btn-light p-1 my-1 bg-grey' to='/'>
            Go Back
          </Link>

          <Product product={product} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductPage;
