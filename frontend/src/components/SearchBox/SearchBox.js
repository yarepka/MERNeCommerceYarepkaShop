import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import './SearchBox.css';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <form className='search-box-form' onSubmit={onSubmitHandler}>
      <input
        type='text'
        placeholder='Search products...'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
      />
      <button
        type='submit'
        className='btn btn-padding-input bg-light text-dark text-uppercase'
      >
        Search
      </button>
    </form>
  );
};

export default withRouter(SearchBox);
