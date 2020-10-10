import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createProductReview } from '../../../redux/actions/productActions';
import FormContainer from '../../Form/FormContainer/FormContainer';
import FormGroup from '../../Form/FormGroup/FormGroup';
import Message from '../../Message/Message';

import './CreateReviewForm.css';

const CreateReviewForm = ({ productId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { error } = productCreateReview;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { comment, rating }));
  };

  return (
    <FormContainer>
      <h2 className='text-uppercase my-2 myb-1'>Write a customer review</h2>
      {error && <Message type='danger'>{error}</Message>}
      <form className='create-review-form' onSubmit={onSubmitHandler}>
        <FormGroup>
          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value=''>Select...</option>
            <option value='1'>1 - Poor</option>
            <option value='2'>2 - Fair</option>
            <option value='3'>3 - Good</option>
            <option value='4'>4 - Very Good</option>
            <option value='5'>5 - Excellent</option>
          </select>
        </FormGroup>
        <FormGroup>
          <label>Comment</label>
          <textarea
            rows='3'
            name='comment'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder='Enter Comment'
          ></textarea>
        </FormGroup>

        <button className='btn bg-dark text-light btn-padding text-uppercase'>
          Submit
        </button>
      </form>
    </FormContainer>
  );
};

export default CreateReviewForm;
