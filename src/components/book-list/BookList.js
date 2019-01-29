import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from '../book/Book';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/actions';
import BookService from '../../services/book.service';

class BookList extends Component {

  componentDidMount() {
    const bookService = new BookService();
    const books = bookService.getCustomerBooks(this.props.customer);
    console.log(books);
    this.props.setBooks(books);
  }

  render() {
    const { customer, books } = this.props;
    return (
      <section className='book-list'>
        <div className='container'>
          <h1 className='heading__primary'>{customer}&apos;s Books</h1>
          <div className='book-list__container'>
            { books.map((book) => {
              return (
                <Book 
                  key={book.id}
                  bookId={book.id}
                  name={book.name}
                  author={book.author}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.customer,
    books: state.books
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBooks: books => {
      dispatch({type: Actions.SET_BOOKS, books});
    },
    onDeleteBook: bookId => {
      dispatch({type: Actions.DELETE_BOOK, bookId});
    }
  };
};

BookList.propTypes = {
  customer: PropTypes.string.isRequired,
  books: PropTypes.array,
  setBooks: PropTypes.func,
  onDeleteBook: PropTypes.func
};

BookList.defaultProps = {
  books: []
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);