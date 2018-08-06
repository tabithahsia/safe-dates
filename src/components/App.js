import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Welcome from './Welcome';
import UserCreation from './UserCreation';
import DateCreation from './DateCreation';
import history from '../history/history';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      serverResponded: false,
      isAuthenticated: false,
      userObj: null,
    };
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    axios.get('/api/user').then(({ data }) => {
      // console.log('/api/user returns 2')
      // console.log('res', res)
      // console.log('foundUser received', data)
      if ( data ) {
        this.setState({
          isAuthenticated: true,
          serverResponded: true,
          data,
        });
      } else {
        this.setState({ serverResponded: true });
      }
    });
  }

  // componentDidUpdate() {
    // console.log('app.js state updated', this.state);
  // }

  updateUser(userObj) {
    this.setState({ userObj });
    // console.log('updated app\'s userObj');
    // console.log('newUser', newUser.fullName)
  }

  render() {
    return (
      <Router history={history}>
        <div className="container-fluid" id="big-container" style={{ backgroundColor: 'teal' }}>
          <Header
            isAuthenticated={this.state.isAuthenticated}
            fullName={this.state.userObj ? this.state.userObj.fullName : ''}
          />
          <Switch>
            {/* Routes */}
            <Route
              exact
              path="/"
              render={() => (
                <Welcome
                  isAuthenticated={this.state.isAuthenticated}
                  serverResponded={this.state.serverResponded}
                  userObj={this.state.userObj}
                />
              )}
            />

            <Route
              exact
              path="/userCreation"
              render={() => (
                <UserCreation
                  updateUser={this.updateUser}
                />
              )}
            />
            <Route
              exact
              path="/dateCreation"
              render={() => (
                <DateCreation />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
