import React from 'react';

import './FormContainer.css';

const FormContainer = ({ children, type }) => {
  const className = type ? `form-wrapper-${type}` : 'form-wrapper';
  return (
    <div className='form-container'>
      <div className={className}>{children}</div>
    </div>
  );
};

export default FormContainer;
