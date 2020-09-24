import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';

class SignupPageContainer extends Component {

    state = {
        firstName: "",
        lastName: "",
        password: "",
        email: ""
    }

    render() {

        return (
            <div className="Home">
                <SignupForm handleFormSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} />
            </div>
        )

    }
    
}

export default connect(

)(SignupPageContainer);