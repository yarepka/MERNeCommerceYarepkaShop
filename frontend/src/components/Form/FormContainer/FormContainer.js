import React from 'react';

import './FormContainer.css';

const FormContainer = ({ children, type, className }) => {
  let classNameFinal = type ? `form-wrapper-${type}` : 'form-wrapper';
  classNameFinal = classNameFinal + (className ? ` ${className}` : '');

  return (
    <div className='form-container'>
      <div className={classNameFinal}>{children}</div>
    </div>
  );
};

export default FormContainer;
