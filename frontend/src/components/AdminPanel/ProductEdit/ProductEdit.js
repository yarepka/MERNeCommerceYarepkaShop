import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../Message/Message';
import Spinner from '../../Spinner/Spinner';
import FormContainer from '../../Form/FormContainer/FormContainer';
import FormGroup from '../../Form/FormGroup/FormGroup';
import FileInput from '../../FileInput/FileInput';
import {
  listProductDetails,
  updateProduct,
} from '../../../redux/actions/productActions';
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_RESET,
} from '../../../redux/actions/types';

import './ProductEdit.css';

const ProductEdit = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { error: errorUpdate, success: successUpdate } = productUpdate;

  if (successUpdate) {
    dispatch({ type: PRODUCT_UPDATE_RESET });
    history.push('/admin/productlist');
  }

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!product || product.id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setImage(product.image);
      setDescription(product.description);
    }
  }, [productId, product.id]);

  const onImageChangeHandler = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file.type.split('/')[0] === 'image') {
        setImage(file);
      } else {
        setImage('');
      }
    },
    [image]
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <Fragment>
      <Link
        className='btn text-dark bg-grey btn-padding block-on-mobile myb-1'
        to='/admin/productlist'
      >
        GO BACK
      </Link>
      <FormContainer type='centered product-edit-container'>
        <h1 className='text-uppercase text-centered-on-mobile'>Edit Product</h1>
        {errorUpdate && <Message type='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message type='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <FormGroup>
              <label>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter name'
              />
            </FormGroup>

            <FormGroup>
              <label>Price</label>
              <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Enter price'
              />
            </FormGroup>

            <FormGroup>
              <FileInput image={image} imageHandler={onImageChangeHandler} />
            </FormGroup>

            <FormGroup>
              <label>Brand</label>
              <input
                type='text'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder='Enter brand'
              />
            </FormGroup>

            <FormGroup>
              <label>Count In Stock</label>
              <input
                type='number'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                placeholder='Enter count in stock'
              />
            </FormGroup>

            <FormGroup>
              <label>Category</label>
              <input
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='Enter category'
              />
            </FormGroup>

            <FormGroup>
              <label>Description</label>
              <textarea
                rows='3'
                name='description'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder='Enter description'
              ></textarea>
            </FormGroup>

            <button
              type='submit'
              className='btn btn-dark text-uppercase block-on-mobile'
            >
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default withRouter(ProductEdit);
