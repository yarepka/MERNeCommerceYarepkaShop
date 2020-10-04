import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = ({ width }) => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{
          width: width ? width + 'px' : '600px',
          maxWidth: '100%',
          margin: 'auto',
          display: 'block',
        }}
        alt='Loading'
      />
    </Fragment>
  );
};

export default Spinner;
