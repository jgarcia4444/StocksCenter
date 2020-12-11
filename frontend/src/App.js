import React, { Component } from 'react';
import './App.css';
import Home from './components/home/Home';
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';
import updateCurrentUser from './actions/UpdateCurrentUser';
import LoginPageContainer from './components/auth/login/LoginPageContainer';
import SignupPageContainer from './components/auth/signup/SignupPageContainer';
import VideosContainer from './components/containers/VideosContainer';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
      this.fetchUser()
  }

  fetchUser = () => {
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      fetch(`http://localhost:3000/users/${userId}`)
        .then(res => res.json())
        .then(json => {
          if (json.user) {
            this.props.updateCurrentUser(json)
          }
        })
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
            <Route path="/videos">
              <VideosContainer />
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
