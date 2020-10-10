import React from 'react';

import Message from '../../Message/Message';
import Rating from '../../Products/Rating/Rating';

import './Reviews.css';

const Reviews = ({ reviews }) => {
  return (
    <div className='reviews'>
      <h2 className='text-uppercase my-2 myb-1'>Reviews</h2>
      {reviews.length === 0 && <Message>No Reviews</Message>}
      <ul className='reviews-list'>
        {reviews.map((review) => {
          return (
            <li key={review.id} className='review-list-item myb-1'>
              <strong>{review.name}</strong>
              <Rating value={review.rating} />
              <p>{review.createdAt.substring(0, 10)}</p>
              <p className='review-comment'>{review.comment}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
