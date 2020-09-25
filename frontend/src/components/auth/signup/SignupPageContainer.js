import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import signupUser from '../../actions/SignupUser';

class SignupPageContainer extends Component {

    state = {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        passwordNoteColor: "red",
        passwordValid: true,
        redirect: null,
        errorMessages: null
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
                passwordNoteColor: "red",
                passwordValid: true
            })
        }
    }

    createUserFromState = () => {
        let newUser = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            password: this.state.password,
            email: this.state.email,
        }
        return newUser
    }

    attemptToSignup = () => {
        if (this.state.password.length < 8) {
            this.setState({
                ...this.state,
                passwordValid: false
            })
        } else {
            let fetchUrl = "http://localhost:3000/signup"
            let newUser = this.createUserFromState()
            let body = JSON.stringify(newUser)
            let options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: body
            }
            fetch(fetchUrl, options)
                .then(res => res.json())
                .then(json => {
                    if (json.id) {
                        console.log(json)
                        this.props.signupUser(json)
                    } else {
                        console.log(json)
                        this.setState({
                            ...this.state,
                            errorMessages: json
                        })
                    }
                })
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.attemptToSignup()
    }

    render() {

        return (
            <div className="Home">
            {this.state.errorMessages ? <p>Email { this.state.errorMessages.email[0] }</p> : null}
            {this.state.passwordValid === false ? <p>Password must be {8 - this.state.password.length} character{this.state.password.length < 7 ? "s" : ""} longer </p> : null}
                <SignupForm passwordNoteColor={this.state.passwordNoteColor} handleFormSubmit={(e) => this.handleSubmit(e)} handleInputChange={(e) => this.handleInputChange(e)} />
            </div>
        )

    }
    
}

export default connect(
    null,
    { signupUser }
)(SignupPageContainer);