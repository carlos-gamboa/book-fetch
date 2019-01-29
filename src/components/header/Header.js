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

  const navList = (
    <ul className='nav__list'>
      <li className='nav__item'><NavLink to='/book' exact activeClassName='nav__link--active' className='nav__link'>Home</NavLink></li>
      <li className='nav__item'><NavLink to='/add' exact activeClassName='nav__link--active' className='nav__link'>Add Book</NavLink></li>
      <li className='nav__item'><button className='button button__text' type='button' onClick={handleLogout}>Logout</button></li>
    </ul>
  );

  return (
    <header className='header'>
      <div className='container header__container'>
        <p className='header__branding'>Books</p>
        <nav className='nav'>
          { isLoggedIn ? navList : null }
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