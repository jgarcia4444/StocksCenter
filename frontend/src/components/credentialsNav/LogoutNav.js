import React from 'react';

const LogoutNav = (props) => {
    return (
       <ul className="nav justify-content-end">
            <li className="nav-item">
                <button onClick={props.handleLogoutClick} className="nav-link">Logout</button>
            </li>
        </ul> 
    )
    

}

export default LogoutNav;