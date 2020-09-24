import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginPageContainer extends Component {

    render() {
        return (
            <div className="Home">
                Hello World Login
            </div>
        )
    }

}

export default connect(

)(LoginPageContainer);