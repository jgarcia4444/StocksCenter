import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import signupUser from '../../../actions/SignupUser';
import { Redirect } from 'react-router-dom'
//
class LoginPageContainer extends Component {

    state = {
        fetchUrl: "http://localhost:3000/login",
        email: "",
        password: "",
        errorMessage: "",
        redirect: ""
    }

    setupLoginInfoForBackend = () => {
        return JSON.stringify({
            login_data: {
                email: this.state.email,
                password: this.state.password
            }
        })
    }

    postLoginAttemotToBackend = (options) => {
        fetch(this.state.fetchUrl, options)
            .then(res => res.json())
            .then(data => {
                if (!data.user) {
                    this.outPutErrorMessage(data)
                } else {
                    localStorage.setItem("userId", data.user.id)
                    this.props.signupUser(data)
                    this.setState({
                        ...this.state,
                        redirect: '/',
                        errorMessage: null
                    })
                    this.refreshPage()
                }
        })
    }
    handleLoginSubmit = (e) => {
        e.preventDefault();
        const loginJson = this.setupLoginInfoForBackend()
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: loginJson
        }
        this.postLoginAttemotToBackend(options)
    }

    refreshPage = () => {
        window.location.reload()
    }

    outPutErrorMessage = (data) => {
        this.setState({
            ...this.state,
            errorMessage: data.message
        })
    }

    handleInputChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        } else {
            return (
                <div className="Home">
                    <LoginForm errorMessage={this.state.errorMessage} email={this.state.email} password={this.state.password} handleLoginSubmit={this.handleLoginSubmit} handleInputChange={this.handleInputChange}/>
                </div>
            )  
        }
    }

}

export default connect(
    null,
    { signupUser }
)(LoginPageContainer);