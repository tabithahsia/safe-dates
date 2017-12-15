import React from 'react';
import Header from './Header.jsx';
import LoginOrStart from './LoginOrStart.jsx';
import UserCreation from './UserCreation.jsx';
import DateCreation from './DateCreation.jsx';
import { Route, BrowserRouter, Switch } from "react-router-dom";

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
  updateComplete(){
    this.setState({userComplete: true})
  }

  updateLogin(logincheck){
    var that = this;
    that.setState({
      serverResponded: true,
      userLogged: logincheck.data.logged,
    })
    console.log('updated routesR\'s login states')
  }

  updateUser(foundUser){
    var that = this;
    that.setState({
      username: foundUser.fullName,
      userComplete: foundUser.userComplete
    })
    console.log('updated routesR\'s user and setting');
    console.log('foundUser', foundUser.fullName)
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container-fluid' id='big-container'>
          <Header />
            <Switch>
              //Routes
              <Route exact path="/" render={(props) => (
                <LoginOrStart
                updateLogin={this.updateLogin}
                updateUser={this.updateUser}
                userLogged={this.state.userLogged}
                serverResponded={this.state.serverResponded}
                userComplete={this.state.userComplete}
                username={this.state.username}
                />
              )}/>

            <Route exact path="/userCreation" render={(props) => (
                <UserCreation
                updateComplete={this.updateComplete}
                />
              )}/>
              <Route exact path="/dateCreation" render={(props) => (
                <DateCreation
                />
              )}/>
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
