import React from 'react';
import Nav from '../nav/Nav';
import './Home.css';
import SearchContainer from '../containers/SearchContainer'
import CredentialsNav from '../credentialsNav/CredentialsNav';

const Home = () => {
    return (
        <div className="Home container">
            <CredentialsNav />
            <h1 className="home-title">StocksCenter</h1>
            <Nav />
            <SearchContainer />
        </div>
    )
}

export default Home;