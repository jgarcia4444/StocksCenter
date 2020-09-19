import React from 'react';
import Nav from './Nav';
import './Home.css';

const Home = () => {
    return (
        <div className="Home container">
            <h1 class="home-title">StocksCenter</h1>
            <Nav />
        </div>
    )
}

export default Home;