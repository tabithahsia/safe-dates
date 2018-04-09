import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import BeforeLogin from './welcomeScreens/BeforeLogin';
import AfterLogin from './welcomeScreens/AfterLogin';

const appName = 'Safe Dates';

class Welcome extends React.Component {
  componentDidMount() {
    const that = this;
    axios.get('/api/loggedin').then(logincheck => {
      // console.log('/api/loggedin returns')
      that.props.updateLogin(logincheck);
      axios.get('/api/user').then(foundUser => {
        // console.log('/api/user returns')
        // console.log('foundUser received', foundUser)
        if (foundUser.data !== null) {
          that.props.updateUser(foundUser.data);
        }
        // that.render();
      });
    });
  }

  render() {
    let content;
    if (this.props.userLogged === false && this.props.serverResponded === true) {
      content = (
        <BeforeLogin appName={appName} />
      );
    } else if (this.props.userLogged === true && this.props.serverResponded === true) {
      content = (
        <AfterLogin
          appName={appName}
          userComplete={this.props.userComplete}
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
  userLogged: PropTypes.bool.isRequired,
  serverResponded: PropTypes.bool.isRequired,
  userComplete: PropTypes.bool.isRequired
};

export default Welcome;
