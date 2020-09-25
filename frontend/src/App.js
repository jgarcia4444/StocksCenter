import React, { Component } from 'react';
import './App.css';
import Home from './components/home/Home';
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';
 import updateCurrentUser from './components/actions/UpdateCurrentUser';

 import LoginPageContainer from './components/auth/login/LoginPageContainer';
 import SignupPageContainer from './components/auth/signup/SignupPageContainer';
import { connect } from 'react-redux';

class App extends Component {

  constructor() {
    super()
    this.fetchUser()
  }

  fetchUser = () => {
    fetch("http://localhost:3000/get-user")
      .then(res => res.json())
      .then(json => {
        if (json.id) {
          console.log(json)
          this.props.updateCurrentUser(json)
        } else {
          console.log(json)
        }
      })
  }
  
  render() {
    return (
      <div className="App container-fluid">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPageContainer />
          </Route>
          <Route path="/signup">
            <SignupPageContainer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
        
      </div>
    )
  }
}

export default connect(
  null,
  { updateCurrentUser }
)(App);
