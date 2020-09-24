import { Link } from 'react-router-dom';
import React from 'react';

const SignupLoginNav = () => {
    return (
        <ul className="nav justify-content-end">
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </ul>
    )
}

export default SignupLoginNav;