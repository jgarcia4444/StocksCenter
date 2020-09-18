import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    let options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        first_name: "Test",
        last_name: "User",
        password: "password",
        email: "test@user.com"
      }),
    }

    fetch("http://localhost:3000/signup", options)
      .then(res => res.json)
      .then(data => console.log(data))

  }
  
  render() {
    return (
      <div className="App">
        <h1>Test!!!!!!!!!</h1>
      </div>
    )
  }
}

export default App;
