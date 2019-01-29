import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

function Header(props) {

  const { isLoggedIn } = props;

  const handleLogout = (event) => {
    event.preventDefault();
    props.onLogout();
    props.history.push('/');
  };

  const loggedNav = (
    <ul className='nav__list'>
      <li className='nav__item'><NavLink to='/book' exact activeClassName='nav__link--active' className='nav__link'>Home</NavLink></li>
      <li className='nav__item'><NavLink to='/book/add' exact activeClassName='nav__link--active' className='nav__link'>Add Book</NavLink></li>
      <li className='nav__item'><button className='button button__text button--sm' type='button' onClick={handleLogout}>Logout</button></li>
    </ul>
  );

  const anonNav = (
    <ul className='nav__list'>
      <li className='nav__item'><NavLink to='/' exact activeClassName='nav__link--active' className='nav__link'>Login</NavLink></li>
      <li className='nav__item'><NavLink to='/register' exact activeClassName='nav__link--active' className='nav__link'>Register</NavLink></li>
    </ul>
  );

  return (
    <header className='header'>
      <div className='container header__container'>
        <p className='header__branding'>Books</p>
        <nav className='nav'>
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