import React, { Component } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Actions from './redux/actions/actions';
import Header from './components/header/Header';
import Auth from './components/auth/Auth';
import BookList from './components/book-list/BookList';
import BookForm from './components/book-form/BookForm';
import PrivateRoute from './components/routes/PrivateRoute';
import AppService from './services/app.service';
import SessionList from './components/session-list/SessionList';

class App extends Component {

  componentDidMount() {    
    const appService = new AppService();
    appService.renewToken()
      .then((response) => {
        if(response.status !== 200) {
          throw response;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-time', new Date().getTime());
        this.props.setIsLoggedIn(true, data.customer, data.username);
      })
      .catch((error) => {
        if (error.status === 401) {
          this.props.setIsLoggedIn(false, '');
          this.props.history.replace('/');
        }
      });
  }

  onLogin = (data) => {
    const appService = new AppService();
    appService.login(data)
      .then((response) => {
        if(response.status !== 200) {
          throw response;
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        this.props.onLogin(responseData.token, responseData.customer, responseData.username);
        this.props.history.replace('/book');
      })
      .catch(() => {
        NotificationManager.error('An error ocurred trying to log in.', 'Error');
      });
  }

  onRegister = (data) => {
    const appService = new AppService();
    appService.register(data)
      .then((response) => {
        if(response.status !== 200) {
          throw response;
        } else {
          NotificationManager.success('Successful register', 'Success!');
          this.props.history.replace('/');
        }
      })
      .catch((error) => {
        if (error.status === 409) {
          NotificationManager.error('Username is already taken.', 'Error');
        } else {
          NotificationManager.error('An error ocurred trying to register.', 'Error');
        }
      });
  }

  onAddBook = (book) => {
    const appService = new AppService();
    appService.interceptRequest(this.addBook, {book: book});
  }

  onUpdateBook = (book, bookId) => {
    const appService = new AppService();
    appService.interceptRequest(this.updateBook, {bookId: bookId, book: book});
  }

  addBook = (appService, data) => {
    appService.addBook(data.book)
      .then((response) => {
        if(response.status !== 200) {
          throw response;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.props.onAddBook(data);
        NotificationManager.success(`${data.name} was added.`, 'Success!');
      })
      .catch((error) => {
        if (error.status === 401) {
          NotificationManager.error('Your session has expired.', 'Error');
          this.props.history.replace('/');
        } else { 
          NotificationManager.error('An error ocurred while adding the book', 'Error');
        }
      });
  }

  updateBook = (appService, data) => {
    appService.updateBook(data.bookId, data.book)
      .then((response) => {
        if(response.status !== 200) {
          throw response;
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        this.props.onUpdateBook(responseData, data.bookId);
        NotificationManager.success(`${data.book.name} was updated.`, 'Success!');
      })
      .catch((error) => {
        if (error.status === 401) {
          NotificationManager.error('Your session has expired.', 'Error');
          this.props.history.replace('/');
        } else { 
          NotificationManager.error('An error ocurred while updating the book', 'Error');
        }
      });
  }

  render() {
    const { onLogout, isLoggedIn } = this.props;

    return (
      <React.Fragment>
        <Header isLoggedIn={isLoggedIn} onLogout={onLogout}></Header>
        <Switch>
          <Route exact path='/' render={() => (
            <Auth title='Login' type='login' onSubmit={this.onLogin}></Auth>
          )} />
          <Route path='/register' render={() => (
            <Auth title='Register' type='register' onSubmit={this.onRegister}></Auth>
          )} />
          <PrivateRoute exact path='/book' component={BookList}></PrivateRoute>
          <PrivateRoute path='/book/add' render={
            <BookForm title='New Book' buttonText='Add Book' onSubmit={this.onAddBook}></BookForm>
          }></PrivateRoute>
          <PrivateRoute path='/book/:bookId' render={
            <BookForm title='Edit Book' buttonText='Save Changes' onSubmit={this.onUpdateBook}></BookForm>
          }></PrivateRoute>
          <PrivateRoute exact path='/session' component={SessionList}></PrivateRoute>
          <Route render={() => <h1 className='heading__primary' style={{marginTop: '10rem'}}>404 NOT FOUND</h1>}></Route>
        </Switch>
        <NotificationContainer/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoggedIn: (isLoggedIn, customer, username) => {
      dispatch({type: Actions.SET_LOGGED_IN, payload: {isLoggedIn: isLoggedIn, customer: customer, username: username}});
    },
    onLogin: (token, customer, username) => {
      dispatch({type: Actions.LOGIN, payload: {token: token, customer: customer, username: username}});
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
  isLoggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  onAddBook: PropTypes.func,
  onUpdateBook: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
