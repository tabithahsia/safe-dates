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
        <AfterLogin
          appName={appName}
          userComplete={this.props.userObj ? this.props.userObj.userComplete : false}
        />
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
  userObj: PropTypes.shape({
    fullName: PropTypes.string,
    phoneNumber: PropTypes.number,
    race: PropTypes.string,
    age: PropTypes.number,
    location: PropTypes.string,
    locationNumber: PropTypes.string,
    UTCdateTime: PropTypes.string,
    height: PropTypes.string,
    gender: PropTypes.string,
    userComplete: PropTypes.bool,
  })
};

Welcome.defaultProps = { userObj: null };

export default Welcome;
