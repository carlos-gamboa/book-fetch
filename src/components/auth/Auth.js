import React, { Component } from 'react';
import './Auth.scss';
import PropTypes from 'prop-types';

class Auth extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      customer: ''
    };
  }

  handleUsernameChange = (event) => {
    event.preventDefault();
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange = (event) => {
    event.preventDefault();
    this.setState({
      password: event.target.value
    });
  }

  handleCustomerChange = (event) => {
    event.preventDefault();
    this.setState({
      customer: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState ({
      username: '',
      password: '',
      customer: ''
    });
  };

  render() {
    const { username, password, customer } = this.state;
    const { title, type } = this.props;
    return (
      <section className='auth'>
        <div className='auth__container'>
          <h1 className='auth__heading'>{title}</h1>
          <form className='auth__form' onSubmit={(event) => this.handleSubmit(event)}>
            <div className='auth__group'>
              <label className='auth__label'>Username</label>
              <input className='auth__input' type='text' value={username} onChange={this.handleUsernameChange}></input>
            </div>
            <div className='auth__group'>
              <label className='auth__label'>Password</label>
              <input className='auth__input' type='password' value={password} onChange={this.handlePasswordChange}></input>
            </div>
            {type !== 'login' ? 
              <div className='auth__group'>
                <label className='auth__label'>Customer</label>
                <input className='auth__input' type='text' value={customer} onChange={this.handleCustomerChange}></input>
              </div> : 
              null
            }
            <button className='auth__button' type='submit' disabled={username === '' || password === ''}>{title}</button>
          </form>
        </div>
      </section>
    );
  }
}

Auth.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
};

export default Auth;
