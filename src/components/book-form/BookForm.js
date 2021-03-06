import React, { Component } from 'react';
import './BookForm.scss';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import AppService from '../../services/app.service';

class BookForm extends Component {

  constructor(props) {
    super();
    this.state = {
      name: props.book.name,
      author: props.book.author
    };
  }

  componentDidMount() {
    if (this.props.bookId !== '') {
      const appService = new AppService();
      appService.interceptRequest(this.getBook, {});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title && this.props.title === 'New Book') {
      this.setState({name: '', author: ''});
    }
  }

  handleNameChange = (event) => {
    event.preventDefault();
    this.setState({
      name: event.target.value
    });
  }

  handleAuthorChange = (event) => {
    event.preventDefault();
    this.setState({
      author: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state, this.props.bookId);
    if (this.props.bookId === ''){
      this.setState({name: '', author: ''});
    }
  };

  getBook = (appService) => {
    appService.getBook(this.props.bookId)
      .then((response) => {
        if(response.status !== 200) {
          throw response;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({name: data.name, author: data.author});
      })
      .catch((error) => {
        if (error.status === 401) {
          NotificationManager.error('Your session has expired.', 'Error');
          this.props.history.replace('/');
        } else {
          NotificationManager.error('An error ocurred while retrieving the book data.', 'Error');
        }
      });
  }

  render() {
    const { name, author } = this.state;
    const { title, buttonText } = this.props;

    return (
      <section className='book-form'>
        <h1 className='book-form__heading'>{title}</h1>
        <form className='book-form__form' onSubmit={(event) => this.handleSubmit(event)}>
          <div className='book-form__group'>
            <label className='book-form__label'>Name</label>
            <input className='book-form__input' type='text' value={name} onChange={this.handleNameChange}></input>
          </div>
          <div className='book-form__group'>
            <label className='book-form__label'>Author</label>
            <input className='book-form__input' type='text' value={author} onChange={this.handleAuthorChange}></input>
          </div>
          <button className='book-form__button' type='submit' disabled={name === '' || author === ''}>{buttonText}</button>
        </form>
      </section>
    );
  }
}

const getIdFromPath = (pathName) => {
  let paths = pathName.split('/');
  return paths[paths.length - 1];
};

const mapStateToProps = (state, otherProps) => {
  const bookId = getIdFromPath(otherProps.location.pathname);
  if (bookId !== 'add') {
    return {
      customer: state.customer,
      bookId: getIdFromPath(otherProps.location.pathname),
      book: state.books.find(book => book.id === bookId)
    };
  } else {
    return {customer: state.customer};
  }
};

const mapDispatchToProps = () => {
  return {};
};

BookForm.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  book: PropTypes.object,
  bookId: PropTypes.string,
  history: PropTypes.object
};

BookForm.defaultProps = {
  book: {
    name: '',
    author: ''
  },
  bookId: ''
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookForm));