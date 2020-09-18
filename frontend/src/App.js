import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {

    // fetch("http://localhost:3000/users/2/user_stocks", {
    //   method: 'Post',
    //   headers: {
    //     'Content-Type': "application/json",
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     stock_symbol: 'AAPL'
    //   })
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))

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
