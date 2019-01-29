import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Book(props) {
  const { name, author, bookId } = props;
  return (
    <div className='book'>
      <div className='book__info'>
        <p className='book__name'>{name}</p>
        <p className='book__author'>By {author}</p>
      </div>
      <Link to={`/book/${bookId}`} className='button button--small book__button'><i className='material-icons button__icon'>edit</i></Link>
      <button className='button button--small button--red book__button'><i className='material-icons button__icon'>clear</i></button>
    </div>
  );
}

Book.propTypes = {
  bookId: PropTypes.string,
  name: PropTypes.string,
  author: PropTypes.string
};

Book.defaultProps = {
  name: 'Untitled',
  author: 'Unkwown Author'
};

export default Book;
