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
    }
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
                userLogged={this.state.userLogged}
                serverResponded={this.state.serverResponded}
                />
              )}/>

            <Route exact path="/formcreation" render{(props) => (
                <UserCreation/>
              )}
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
