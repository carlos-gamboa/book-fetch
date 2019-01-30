import React, { Component } from 'react';
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

class App extends Component {

  componentDidMount() {
    this.props.setIsLoggedIn(false, '');
    if(this.props.location.pathname === '/'){
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
          this.props.setIsLoggedIn(true, data.customer);
          this.props.history.replace('/book');
        })
        .catch((error) => {
          if (error.status === 401) {
            this.props.setIsLoggedIn(false, '');
          }
        });
    }
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
        this.props.onLogin(responseData.token, responseData.customer);
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
      .catch(() => {
        NotificationManager.error('An error ocurred trying to register.', 'Error');
      });
  }

  onAddBook = (book) => {
    const appService = new AppService();
    appService.addBook(book)
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

  onUpdateBook = (bookId, book) => {
    const appService = new AppService();
    appService.updateBook(bookId, book)
      .then((response) => {
        if(response.status !== 200) {
          throw response;
        } else {
          return response.json();
        }
      })
      .then(() => {
        this.props.onUpdateBook(book, bookId);
        NotificationManager.success(`${book.name} was updated.`, 'Success!');
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
    setIsLoggedIn: (isLoggedIn, customer) => {
      dispatch({type: Actions.SET_LOGGED_IN, payload: {isLoggedIn: isLoggedIn, customer: customer}});
    },
    onLogin: (token, customer) => {
      dispatch({type: Actions.LOGIN, payload: {token: token, customer: customer}});
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
