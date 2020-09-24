import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignupLoginNav from './SignupLoginNav';
import LogoutNav from './LogoutNav';

class CredentialsNav extends Component {

    render() {

        return (
            <div className="credentials-nav-signup-login">
                {this.props.user? <SignupLoginNav /> : <LogoutNav />}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.currentUser
    }
    
}

export default connect(
    mapStateToProps,
    null
)(CredentialsNav);