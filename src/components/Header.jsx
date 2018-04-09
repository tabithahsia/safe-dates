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
    </div>
    <div id="navbar" className="navbar-collapse collapse">
      <ul className="nav navbar-nav">
        <li><a href="/">Home</a></li>
        {props.userLogged ? <li><a href="/logout">Logout</a></li> : null}
        <li className="dropdown">
          {/* <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Useful Info<span className="caret"></span></a> */}
          <ul className="dropdown-menu">
            <li><a href="/">Home</a></li>
            {props.userLogged ? <li><a href="/logout">Logout</a></li> : null}
          </ul>
        </li>
      </ul>
    </div>
  </nav>
);

Header.propTypes = {
  userLogged: PropTypes.bool.isRequired
};

export default Header;
