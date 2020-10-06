import React from 'react';

import './FormGroup.css';

const FormGroup = ({ children, className }) => {
  return (
    <div className={'form-group my-1' + (className ? ` ${className}` : '')}>
      {children}
    </div>
  );
};

export default FormGroup;
