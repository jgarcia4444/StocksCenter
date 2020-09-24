import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignupPageContainer extends Component {

    render() {

        return (
            <div className="Home">
                hello world signup
            </div>
        )

    }
    
}

export default connect(

)(SignupPageContainer);