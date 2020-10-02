import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Product from '../../components/Products/Product/Product';

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : (
        [
          <Link className='btn btn-light p-1 my-1' to='/'>
            Go Back
          </Link>,

          <Product product={product} />,
        ]
      )}
    </Fragment>
  );
};

export default ProductPage;
