import React from 'react';
import './Session.scss';
import PropTypes from 'prop-types';

function Session(props) {
  const { sessionId, browser, os, device, iat, onRevokeSession } = props;

  const handleRevokeSession = (event) => {
    event.preventDefault();
    onRevokeSession(sessionId);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return`${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()} at ${newDate.getHours()}:${(newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes()}`;
  };

  return (
    <div className='session'>
      <div className='session__icon-wrapper'>
        <i className='material-icons session__icon session__icon--big'>{device  && device !== '' ? 'phone_iphone' : 'computer'}</i>
      </div>
      <ul className='session__list'>
        <li className='session__item'><p className='session__label'>Browser:</p>{browser}</li>
        <li className='session__item'><p className='session__label'>Operating System:</p>{os}</li>
        {
          device  && device !== '' ?
            <li className='session__item'><p className='session__label'>Device:</p>{device}</li> :
            ''
        }
        <li className='session__item'><p className='session__label'>Generated on:</p>{formatDate(iat)}</li>
      </ul>
      <button className='session__button session__button--secondary' onClick={(event) => handleRevokeSession(event)}><i className='material-icons session__icon'>clear</i></button>
    </div>
  );
}

Session.propTypes = {
  sessionId: PropTypes.string.isRequired,
  browser: PropTypes.string,
  os: PropTypes.string,
  device: PropTypes.string,
  iat: PropTypes.string,
  onRevokeSession: PropTypes.func.isRequired
};

Session.defaultProps = {
  device: ''
};

export default Session;
