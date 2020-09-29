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
  }

  componentDidMount() {
    window.onload = () => {
      this.fetchUser()
    }
  }

  fetchUser = () => {
    console.log("HELLLLOOOOO!!!!!")
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      console.log(userId)
      fetch(`http://localhost:3000/users/${localStorage.getItem("userId")}`)
        .then(res => res.json())
        .then(json => {
          if (json.user) {
            this.props.updateCurrentUser(json)
          } else {
            console.log(json)
          }
        })
    } else {
      console.log(userId)
    }
    
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
