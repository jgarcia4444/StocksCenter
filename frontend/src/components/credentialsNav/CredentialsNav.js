import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignupLoginNav from './SignupLoginNav';
import LogoutNav from './LogoutNav';

import logUserOut from '../actions/LogUserOut';

class CredentialsNav extends Component {

    state = {
        hasLoggedInUser: false
    }

    componentDidMount() {
        if (Object.keys(this.props.user).length > 0) {
            this.setState({
                hasLoggedInUser: true
            })
        } else {
            this.setState({
                hasLoggedInUser: false
            })
        }
    }

    logoutClicked = () => {
        console.log(this.props.logUserOut())
        this.setState({
            hasLoggedInUser: false
        })
        this.props.logUserOut()
    }

    render() {

        return (
            <div className="credentials-nav-signup-login">
                {this.state.hasLoggedInUser == true ? <LogoutNav handleLogoutClick={this.logoutClicked} /> : <SignupLoginNav /> }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logUserOut: () => dispatch(logUserOut())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CredentialsNav);