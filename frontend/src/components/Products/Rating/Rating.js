import React from 'react';
import PropTypes from 'prop-types';

import './Rating.css';

const Rating = ({ value, text, color, highest }) => {
  const rating = [];
  for (let i = 1; i <= highest; i++) {
    rating.push(
      <span key={i}>
        <i
          style={{ color }}
          className={
            value >= i
              ? 'fas fa-star'
              : value >= i - 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
    );
  }

  return (
    <div className='rating'>
      {rating}
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#ffc93c',
  highest: 5,
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
  highest: PropTypes.number,
};

export default Rating;
