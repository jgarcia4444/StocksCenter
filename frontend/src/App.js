import React, { Component } from 'react';
import './App.css';
import Home from './components/home/Home';
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';

 import LoginPageContainer from './components/auth/login/LoginPageContainer';
 import SignupPageContainer from './components/auth/signup/SignupPageContainer';

class App extends Component {

  
  
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

export default App;
