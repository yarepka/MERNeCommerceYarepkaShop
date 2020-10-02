import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductItem from './ProductItem/ProductItem';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className='products'>
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
