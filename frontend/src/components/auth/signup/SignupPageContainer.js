import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';

class SignupPageContainer extends Component {

    state = {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        passwordNoteColor: "red"
    }

    handleInputChange = (e) => {
        if (e.target.name === "password" && e.target.value.length > 7) {
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value,
                passwordNoteColor: "green"
            })
        } else {
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value,
                passwordNoteColor: "red"
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }

    render() {

        return (
            <div className="Home">
                <SignupForm passwordNoteColor={this.state.passwordNoteColor} handleFormSubmit={(e) => this.handleSubmit(e)} handleInputChange={(e) => this.handleInputChange(e)} />
            </div>
        )

    }
    
}

export default connect(

)(SignupPageContainer);