import React from 'react';
import PropTypes from 'prop-types';
import BeforeLogin from './welcomeScreens/BeforeLogin';
import AfterLogin from './welcomeScreens/AfterLogin';

const appName = 'Safe Dates';

class Welcome extends React.Component {
  componentWillReceiveProps() {

  }

  render() {
    let content;
    if (this.props.isAuthenticated === false && this.props.serverResponded === true) {
      content = (
        <BeforeLogin appName={appName} />
      );
    } else if (this.props.isAuthenticated === true && this.props.serverResponded === true) {
      content = (
        <AfterLogin appName={appName} />
      );
    } else {
      content = (<h3>Waiting for server ...</h3>);
    }
    return (
      <div className="container card text-center login">
        {content}
      </div>
    );
  }
}

Welcome.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  serverResponded: PropTypes.bool.isRequired,
};

export default Welcome;
