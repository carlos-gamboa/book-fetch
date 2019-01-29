import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from '../book/Book';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/actions';

class BookList extends Component {

  componentDidMount() {
    const headers = new Headers();
    headers.append('customer', this.props.customer);

    const config = { 
      method: 'GET',
      headers: headers
    };

    fetch('http://10.28.6.4:8080/book', config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.setBooks(data);
      });
  }

  onDeleteBook = (bookId) => {
    const headers = new Headers();
    headers.append('customer', this.props.customer);

    const config = { 
      method: 'DELETE',
      headers: headers
    };

    fetch('http://10.28.6.4:8080/book/' + bookId, config)
      .then(() => {
        this.props.onDeleteBook(bookId);
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