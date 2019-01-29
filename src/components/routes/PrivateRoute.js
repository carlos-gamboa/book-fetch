import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {

  render() {
    const { isLoggedIn, redirectTo, location, keepSearch, component: Component, render, ...rest } = this.props;
    let redirectElement = redirectTo;
    if (keepSearch) {
      redirectElement = `${redirectTo}?redirect=${location.pathname.replace(/\//g, '')}&${location.search.replace(/\?/g, '')}`;
    }
    return (
      <Route {...rest} render={(props) => (
        isLoggedIn
          ? (render ? render : <Component {...props} />)
          : <Redirect to={redirectElement} />
      )} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string,
  keepSearch: PropTypes.bool,
  location: PropTypes.object,
  component: PropTypes.func,
  render: PropTypes.object
};

PrivateRoute.defaultProps = {
  redirectTo: '/',
  keepSearch: false
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);