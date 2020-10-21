import React from 'react';

import './NotFound.css';

const NotFound = () => {
  return (
    <div className='not-found'>
      <h1>
        <i className='fas fa-exclamation-triangle'></i> Page Not Found
      </h1>
      <p>Sorry, this page does not exist</p>
    </div>
  );
};

export default NotFound;
