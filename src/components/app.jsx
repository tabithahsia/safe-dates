import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './Header';
import Welcome from './Welcome';
import UserCreation from './UserCreation';
import DateCreation from './DateCreation';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userLogged: false,
      serverResponded: false,
      username: '',
      userComplete: false
    }

    this.updateLogin = this.updateLogin.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateComplete = this.updateComplete.bind(this)
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  updateComplete() {
    this.setState({ userComplete: true })
  }

  updateLogin(logincheck) {
    this.setState({
      serverResponded: true,
      userLogged: logincheck.data.logged,
    })
    console.log('updated routesR\'s login states')
  }

  updateUser(foundUser) {
    this.setState({
      username: foundUser.fullName,
      userComplete: foundUser.userComplete
    })
    // console.log('updated routesR\'s user and setting');
    // console.log('foundUser', foundUser.fullName)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid" id="big-container" style={{ backgroundColor: 'teal' }}>
          <Header
            userLogged={this.state.userLogged}
          />
          <Switch>
            {/* Routes */}
            <Route
              exact
              path="/"
              render={() => (
                <Welcome
                  updateLogin={this.updateLogin}
                  updateUser={this.updateUser}
                  userLogged={this.state.userLogged}
                  serverResponded={this.state.serverResponded}
                  userComplete={this.state.userComplete}
                />
              )}
            />

            <Route
              exact
              path="/userCreation"
              render={() => (
                <UserCreation
                  updateComplete={this.updateComplete}
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
      </BrowserRouter>
    );
  }
}

export default App;
