import React from 'react';
import PropTypes from 'prop-types';

const BeforeLogin = props => (
  <div className="card-block">
    <h1 className="card-title">Welcome to {props.appName}</h1>
    <br />
    <h4 className="card-text">Log in with Facebook and stay safe during date nights!.</h4>
    <br />
    <a href="/auth/facebook" className="btn btn-primary">Login</a>
  </div>
);

BeforeLogin.propTypes = { appName: PropTypes.string.isRequired };

export default BeforeLogin;

