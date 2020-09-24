import React from 'react';
import './Nav.css'

const Nav = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">Videos</a>
            </li>
        </ul>
    )
}

export default Nav;