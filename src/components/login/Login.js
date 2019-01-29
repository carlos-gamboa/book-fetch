import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      customer: ''
    };
  }

  handleCustomerChange = (event) => {
    event.preventDefault();
    this.setState({
      customer: event.target.value
    });
  }

  handleLogin = (event) => {
    event.preventDefault();
    this.props.onLogin(this.state.customer);
    this.props.history.replace('/book');
  };

  render() {
    const { customer } = this.state;
    return (
      <section className='login'>
        <div className='container login__container'>
          <h1 className='heading__primary'>Login</h1>
          <form className='form login__form' onSubmit={(event) => this.handleLogin(event)}>
            <div className='form__control'>
              <label className='form__label'>Customer</label>
              <input className='form__input' type='text' value={customer} onChange={this.handleCustomerChange}></input>
            </div>
            <button className='button button__submit' type='submit'>Login</button>
          </form>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(Login);
