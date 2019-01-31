import React from 'react';
import './Book.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Book(props) {
  const { name, author, bookId, onDeleteBook } = props;

  const handleDeleteBook = (event) => {
    event.preventDefault();
    onDeleteBook(bookId);
  };

  return (
    <div className='book'>
      <div className='book__info'>
        <p className='book__name'>{name}</p>
        <p className='book__author'>By {author}</p>
      </div>
      <Link to={`/book/${bookId}`} className='book__button book__button--terciary'><i className='material-icons book__icon'>edit</i></Link>
      <button className='book__button book__button--secondary' onClick={(event) => handleDeleteBook(event)}><i className='material-icons book__icon'>clear</i></button>
    </div>
  );
}

Book.propTypes = {
  bookId: PropTypes.string,
  name: PropTypes.string,
  author: PropTypes.string,
  onDeleteBook: PropTypes.func.isRequired
};

Book.defaultProps = {
  name: 'Untitled',
  author: 'Unkwown Author'
};

export default Book;
