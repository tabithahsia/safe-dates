import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const appName = 'Safe Dates';

class LoginOrStart extends React.Component {
  componentDidMount() {
    const that = this;
    axios.get('/api/loggedin').then(logincheck => {
      // console.log('/api/loggedin returns')
      that.props.updateLogin(logincheck)
      axios.get('/api/user').then(foundUser => {
        // console.log('/api/user returns')
        // console.log('foundUser received', foundUser)
        if (foundUser.data !== null) {
          that.props.updateUser(foundUser.data)
        }
        // that.render();
      });
    });
  }

  render() {
    let content;
    if (this.props.userLogged === false && this.props.serverResponded === true) {
      content = (
        <div className="container card text-center login">
          <div className="card-block">
            <h1 className="card-title">Welcome to {appName}</h1>
            <br />
            <h4 className="card-text">Log in with Facebook and stay safe during date nights!.</h4>
            <br />
            <a href="/auth/facebook" className="btn btn-primary">Login</a>
          </div>
        </div>
      );
    } else if (this.props.userLogged === true && this.props.serverResponded === true) {
      content = (
        <div className="container card text-center login">
          <div className="card-block">
            <h1 className="card-title">Welcome to {appName}</h1>
            <br />
            <h4 className="card-text">Create Profile or Create Date Night Alert</h4>
            <br />
            {
              this.props.userComplete ? <Link to="/dateCreation" className="btn btn-info create_btn">Create Date Alert</Link> : <h6>Please create profile</h6>
            }
            <Link to="/userCreation" className="btn btn-success create_btn">Update User Information</Link>
          </div>
        </div>
      )
    } else {
      content = (<h3>Waiting for server ...</h3>)
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

LoginOrStart.propTypes = {
  userLogged: PropTypes.bool.isRequired,
  serverResponded: PropTypes.bool.isRequired,
  userComplete: PropTypes.bool.isRequired
};

export default LoginOrStart;