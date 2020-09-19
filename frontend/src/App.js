import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {

    fetch("http://localhost:3000/users/3/user_stocks/AAPL", {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: "3",
        stock_symbol: "AAPL"
      })
    })
    .then(res => res.json())
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
