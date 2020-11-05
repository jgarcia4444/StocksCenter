import React from 'react';
import './Nav.css'

const Nav = () => {

    const pathString = window.location.pathname

    return (
        <ul className="nav">
            <li className="nav-item">
                <a className={pathString === "/" ? "nav-link active-tab" : "nav-link"} href="/">Home</a>
            </li>
            <li className="nav-item">
                <a className={pathString === "/videos" ? "nav-link active-tab" : "nav-link"} href="/videos">Videos</a>
            </li>
        </ul>
    )
}

export default Nav;