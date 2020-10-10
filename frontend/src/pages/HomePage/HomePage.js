import React, { Fragment } from 'react';
import Meta from '../../components/Meta/Meta';

import Products from '../../components/Products/Products';

const HomePage = () => {
  return (
    <Fragment>
      <Meta title='YarepkaShop | Home' />
      <h1 className='text-uppercase text-centered my-1'>Latest Products</h1>

      <Products />
    </Fragment>
  );
};

export default HomePage;
