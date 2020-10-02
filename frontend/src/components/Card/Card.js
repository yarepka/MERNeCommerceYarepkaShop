import React from 'react';
import './Card.css';

const Card = ({ children, className }) => {
  const cardClasses = `card` + (!className ? '' : ' ' + className);
  return <div className={cardClasses}>{children}</div>;
};

export default Card;
