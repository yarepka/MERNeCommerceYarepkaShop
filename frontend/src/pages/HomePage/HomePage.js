import React, { Fragment } from 'react';

import Products from '../../components/Products/Products';

const HomePage = () => {
  return (
    <Fragment>
      <h1 className='text-uppercase text-centered my-1'>Latest Products</h1>

      <Products />
    </Fragment>
  );
};

export default HomePage;
