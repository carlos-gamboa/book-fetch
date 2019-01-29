import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Actions from './redux/actions/actions';
import Header from './components/header/Header';
import Login from './components/login/Login';
import BookList from './components/book-list/BookList';
import BookForm from './components/book-form/BookForm';
import PrivateRoute from './components/routes/PrivateRoute';

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
        NotificationManager.success(`${data.name} was added.`, 'Success!');
      })
      .catch(() => {
        NotificationManager.error('An error has occurred', 'Error');
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
        NotificationManager.success(`${book.name} was updated.`, 'Success!');
      })
      .catch(() => {
        NotificationManager.error('An error has occurred', 'Error');
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
          <PrivateRoute exact path='/book' component={BookList}></PrivateRoute>
          <PrivateRoute path='/book/add' render={() => (
            <BookForm title='New Book' buttonText='Add Book' onSubmit={this.onAddBook}></BookForm>
          )}></PrivateRoute>
          <PrivateRoute path='/book/:bookId' render={() => (
            <BookForm title='Edit Book' buttonText='Save Changes' onSubmit={this.onUpdateBook}></BookForm>
          )}></PrivateRoute>
          <Route render={() => <h1 className='heading__primary' style={{marginTop: '10rem'}}>404 NOT FOUND</h1>}></Route>
        </Switch>
        <NotificationContainer/>
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
