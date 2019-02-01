import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Session from '../session/Session';
import './SessionList.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import AppService from '../../services/app.service';

class SessionList extends Component {
  constructor() {
    super();
    this.state = {
      sessions: []
    };
  }

  componentDidMount() {
    const appService = new AppService();
    appService.interceptRequest(this.getAllSessions, {});
  }

  onRevokeSession = (sessionId) => {
    const appService = new AppService();
    appService.interceptRequest(this.revokeSession, {sessionId: sessionId});
  }

  getAllSessions = (appService) => {
    appService.getAllSessions()
      .then((response) => {
        if(response.status !== 200) {
          throw response;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({
          sessions: data
        });
      })
      .catch((error) => {
        if (error.status === 401) {
          NotificationManager.error('Your session has expired.', 'Error');
          this.props.history.replace('/');
        } else {
          NotificationManager.error('An error has occurred.', 'Error');
        }
      });
  }

  revokeSession = (appService, data) => {
    appService.revokeSession(data.sessionId)
      .then((response) => {
        if(response.status !== 200) {
          throw response;
        } else {
          const sessions = this.state.sessions;
          delete sessions[data.sessionId];
          this.setState({
            sessions: sessions
          });
          NotificationManager.success('The session has been revoked.', 'Success!');
        }
      })
      .catch ((error) => {
        if (error.status === 401) {
          NotificationManager.error('Your session has expired.', 'Error');
          this.props.history.replace('/');
        } else { 
          NotificationManager.error('An error ocurred while revoking the session.', 'Error');
        }
      });
  }

  render() {
    const { sessions } = this.state;
    const { user } = this.props;
    return (
      <section className='session-list'>
        <h1 className='session-list__heading'>{user}&apos;s Sessions</h1>
        <div className='session-list__container'>
          { Object.keys(sessions).map(key => {
            return (
              <Session 
                key={key}
                sessionId={key}
                browser={sessions[key].browser}
                os={sessions[key].os}
                device={sessions[key].device}
                iat={sessions[key].iat}
                onRevokeSession={this.onRevokeSession}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = () => {
  return {};
};

SessionList.propTypes = {
  user: PropTypes.string.isRequired,
  history: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionList));