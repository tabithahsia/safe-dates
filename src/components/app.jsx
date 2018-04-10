import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Welcome from './Welcome';
import UserCreation from './UserCreation';
import DateCreation from './DateCreation';

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
    axios.get('/api/user').then(foundUser => {
      // console.log('/api/user returns')
      // console.log('foundUser received', foundUser)
      if (foundUser.data) {
        this.setState({
          userObj: foundUser.data,
          isAuthenticated: true,
          serverResponded: true,
        });
      } else {
        this.setState({ serverResponded: true });
      }
    });
  }

  componentDidUpdate() {
    // console.log('app.jsx state updated', this.state);
  }

  updateUser(newUser) {
    this.setState({
      userObj: newUser
    });
    // console.log('updated app\'s userObj');
    // console.log('newUser', newUser.fullName)
  }

  render() {
    return (
      <Router>
        <div className="container-fluid" id="big-container" style={{ backgroundColor: 'teal' }}>
          <Header
            isAuthenticated={this.state.isAuthenticated}
            userObj={this.state.userObj}
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
