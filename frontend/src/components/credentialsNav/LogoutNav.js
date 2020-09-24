import React from 'react';
import { Link } from 'react-router-dom';

const LogoutNav = () => {
    return (
       <ul className="nav justify-content-end">
            <li className="nav-item">
                <Link to="/logout" className="nav-link">Logout</Link>
            </li>
        </ul> 
    )
    

}

export default LogoutNav;