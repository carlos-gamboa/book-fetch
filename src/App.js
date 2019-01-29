import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Actions from './redux/actions/actions';
import Header from './components/header/Header';
import Login from './components/login/Login';
import BookList from './components/book-list/BookList';
import BookForm from './components/book-form/BookForm';

class App extends Component {

  onAddBook = (book) => {
    const headers = new Headers();
    headers.append('customer', this.props.customer);
    headers.append('Content-Type', 'application/json');

    const config = { 
      method: 'POST',
      headers: headers,
      body: JSON.stringify(book)
    };

    fetch('http://10.28.6.4:8080/book', config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.onAddBook(data);
      });
  }

  onUpdateBook = (book, bookId) => {
    const headers = new Headers();
    headers.append('customer', this.props.customer);
    headers.append('Content-Type', 'application/json');

    const config = { 
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(book)
    };

    fetch('http://10.28.6.4:8080/book/' + bookId, config)
      .then((response) => {
        return response.json();
      })
      .then(() => {
        this.props.onUpdateBook(book, bookId);
      });
  }

  render() {
    const { onLogin, onLogout, isLoggedIn } = this.props;

    return (
      <React.Fragment>
        <Header isLoggedIn={isLoggedIn} onLogout={onLogout}></Header>
        <Switch>
          <Route exact path='/' render={() => (
            <Login onLogin={onLogin}></Login>
          )} />
          <Route exact path='/book' component={BookList}></Route>
          <Route path='/book/add' render={() => (
            <BookForm title='New Book' buttonText='Add Book' onSubmit={this.onAddBook}></BookForm>
          )}></Route>
          <Route path='/book/:bookId' render={() => (
            <BookForm title='Edit Book' buttonText='Save Changes' onSubmit={this.onUpdateBook}></BookForm>
          )}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.customer,
    isLoggedIn: state.customer !== ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (customer) => {
      dispatch({type: Actions.LOGIN, customer});
    },
    onLogout: () => {
      dispatch({type: Actions.LOGOUT});
    },
    onAddBook: (book) => {
      dispatch({type: Actions.ADD_BOOK, book});
    },
    onUpdateBook: (book, bookId) => {
      dispatch({type: Actions.UPDATE_BOOK, payload: {bookId: bookId, book: book}});
    }
  };
};

App.propTypes = {
  customer: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  onAddBook: PropTypes.func,
  onUpdateBook: PropTypes.func
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
