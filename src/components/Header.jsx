import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
  <nav className="navbar navbar-inverse" id="navbar1">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
      <a className="navbar-brand" href="/">Safe Dates</a>
      {props.fullName ? <h6>props.userObj.fullName</h6> : null}
    </div>
    <div id="navbar" className="navbar-collapse collapse">
      <ul className="nav navbar-nav">
        <li><a href="/">Home</a></li>
        {props.isAuthenticated ? <li><a href="/logout">Logout</a></li> : null}
        <li className="dropdown">
          <ul className="dropdown-menu">
            <li><a href="/">Home</a></li>
            {props.isAuthenticated ? <li><a href="/logout">Logout</a></li> : null}
          </ul>
        </li>
      </ul>
    </div>
  </nav>
);

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  fullName: PropTypes.string,
};

Header.defaultProps = { fullName: '' };

export default Header;
