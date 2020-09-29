import React from 'react';
import Nav from '../../nav/Nav'

const LoginForm = (props) => {



    return (
        <div className="login-form container">
            <Nav />
            <form onSubmit={props.handleLoginSubmit}>
                <div className="row">
                    <div className="col-12">
                    <h2>Login Form</h2>  
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input onChange={props.handleInputChange} type="email" name="email" value={props.email} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={props.handleInputChange} type="password" name="password" value={props.password} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
        
    )
}

export default LoginForm;