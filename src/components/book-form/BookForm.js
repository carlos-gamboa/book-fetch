import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class BookForm extends Component {

  constructor(props) {
    super();
    this.state = {
      name: props.book.name,
      author: props.book.author
    };
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
    this.props.onSubmit(this.state);
  };

  render() {
    const { name, author } = this.state;
    const { title, buttonText } = this.props;

    return (
      <section className='book-details'>
        <div className='container'>
          <h1 className='heading__primary'>{title}</h1>
          <form className='form details__form' onSubmit={(event) => this.handleSubmit(event)}>
            <div className='form__control form__control--big '>
              <label className='form__label'>Name</label>
              <input className='form__input' type='text' value={name} onChange={this.handleNameChange}></input>
            </div>
            <div className='form__control form__control--big '>
              <label className='form__label'>Author</label>
              <input className='form__input' type='text' value={author} onChange={this.handleAuthorChange}></input>
            </div>
            <button className='button button__submit' type='submit'>{buttonText}</button>
          </form>
        </div>
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
      book: state.books.find(book => book.id === bookId)
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = () => {
  return {};
};

BookForm.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  book: PropTypes.object
};

BookForm.defaultProps = {
  book: {
    name: '',
    author: ''
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookForm));