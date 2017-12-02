import React from 'react';
import Header from './Header.jsx';
import LoginOrStart from './LoginOrStart.jsx';
import UserCreation from './UserCreation.jsx';
import { Route, BrowserRouter, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userLogged: false,
      serverResponded: false,
      username: ''
    }

    this.updateLogin = this.updateLogin.bind(this);
    this.updateUser = this.updateUser.bind(this)
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
      username: foundUser.username
    })
    console.log('updated routesR\'s user & goal states');
    console.log('foundUser', foundUser.username)
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
                />
              )}/>

            <Route exact path="/formcreation" render={(props) => (
                <UserCreation/>
              )}/>
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
