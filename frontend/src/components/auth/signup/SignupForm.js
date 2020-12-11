import React from 'react';
import Nav from '../../nav/Nav'

const SignupForm = (props) => {

    return (
        <div className="signup-form container">
            <Nav />
            <div className="row">
                <div className="col-12">
                  <h2>Signup Form</h2>  
                </div>
            </div>
            <form onSubmit={props.handleFormSubmit}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" name="firstName" type="text" className="form-control" onChange={ props.handleInputChange}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName" type="text" name="lastName" className="form-control" onChange={ props.handleInputChange}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" className="form-control" name="email" onChange={ props.handleInputChange}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" className="form-control" aria-describedby="passwordHelp" onChange={ props.handleInputChange}/>
                            <small id="passwordHelp" className="form-text" style={{color : props.passwordNoteColor}}>Password must be 8 characters long.</small>
                        </div>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignupForm;