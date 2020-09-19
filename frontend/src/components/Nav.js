import React from 'react';
import './Nav.css'

const Nav = () => {
    return (
        <ul class="nav">
            <li class="nav-item">
                <a class="nav-link active" href="#">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Videos</a>
            </li>
        </ul>
    )
}

export default Nav;