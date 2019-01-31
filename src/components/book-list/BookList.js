import React, { Component } from 'react';
import './BookList.scss';
import PropTypes from 'prop-types';
import Book from '../book/Book';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Actions from '../../redux/actions/actions';
import { NotificationManager } from 'react-notifications';
import AppService from '../../services/app.service';

class BookList extends Component {

  componentDidMount() {
    const appService = new AppService();
    appService.interceptRequest(this.getAllBooks, {});
  }

  onDeleteBook = (bookId) => {
    const appService = new AppService();
    appService.interceptRequest(this.deleteBook, {bookId: bookId});
  }

  getAllBooks = (appService) => {
    appService.getAllBooks()
      .then((response) => {
        if(response.status !== 200) {
          throw response;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.props.setBooks(data);
      })
      .catch((error) => {
        if (error.status === 401) {
          NotificationManager.error('Your session has expired.', 'Error');
          this.props.history.replace('/');
        } else {
          NotificationManager.error('An error has occurred.', 'Error');
        }
      });
  }

  deleteBook = (appService, data) => {
    appService.deleteBook(data.bookId)
      .then((response) => {
        if(response.status !== 200) {
          throw response;
        } else {
          this.props.onDeleteBook(data.bookId);
          NotificationManager.success('The book was deleted.', 'Success!');
        }
      })
      .catch ((error) => {
        if (error.status === 401) {
          NotificationManager.error('Your session has expired.', 'Error');
          this.props.history.replace('/');
        } else { 
          NotificationManager.error('An error ocurred while deleting the book.', 'Error');
        }
      });
  }

  render() {
    const { customer, books } = this.props;
    return (
      <section className='book-list'>
        <h1 className='book-list__heading'>{customer}&apos;s Books</h1>
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
  onDeleteBook: PropTypes.func,
  history: PropTypes.object
};

BookList.defaultProps = {
  books: []
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookList));