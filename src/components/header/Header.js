import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import { NavLink, withRouter } from 'react-router-dom';

function Header(props) {

  const { isLoggedIn } = props;

  const handleLogout = (event) => {
    event.preventDefault();
    props.onLogout();
    props.history.push('/');
  };

  const loggedNav = (
    <ul className='header__list'>
      <li className='header__item'><NavLink to='/book' exact activeClassName='header__link--active' className='header__link'>Home</NavLink></li>
      <li className='header__item'><NavLink to='/book/add' exact activeClassName='header__link--active' className='header__link'>Add Book</NavLink></li>
      <li className='header__item'><NavLink to='/session' exact activeClassName='header__link--active' className='header__link'>Sessions</NavLink></li>
      <li className='header__item'><button className='header__button' type='button' onClick={handleLogout}>Logout</button></li>
    </ul>
  );

  const anonNav = (
    <ul className='header__list'>
      <li className='header__item'><NavLink to='/' exact activeClassName='header__link--active' className='header__link'>Login</NavLink></li>
      <li className='header__item'><NavLink to='/register' exact activeClassName='header__link--active' className='header__link'>Register</NavLink></li>
    </ul>
  );

  return (
    <header className='header'>
      <div className='header__container'>
        <p className='header__branding'>Books</p>
        <nav className='header__nav'>
          { isLoggedIn ? loggedNav : anonNav }
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(Header);