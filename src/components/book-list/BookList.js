import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from '../book/Book';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/actions';
import { NotificationManager } from 'react-notifications';
import AppService from '../../services/app.service';

class BookList extends Component {

  componentDidMount() {
    const appService = new AppService();
    appService.getAllBooks()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.setBooks(data);
      });
  }

  onDeleteBook = (bookId) => {
    const appService = new AppService();
    appService.deleteBook(bookId)
      .then(() => {
        this.props.onDeleteBook(bookId);
        NotificationManager.success('The book was deleted.', 'Success!');
      })
      .catch (() => {
        NotificationManager.error('An error has occurred', 'Error');
      });
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
                  onDeleteBook={this.onDeleteBook}
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