import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AfterLogin = props => (
  <div className="card-block">
    <h1 className="card-title">Welcome to {props.appName}</h1>
    <br />
    <h4 className="card-text">Create Profile or Create Date Night Alert</h4>
    <br />
    {
      props.userComplete ?
        <Link to="/dateCreation" className="btn btn-info create_btn">Create Date Alert</Link> : <h6>Please create profile</h6>
    }
    <Link to="/userCreation" className="btn btn-success create_btn">Update User Information</Link>
  </div>
);

AfterLogin.propTypes = {
  appName: PropTypes.string.isRequired,
  userComplete: PropTypes.bool.isRequired
};

export default AfterLogin;
