import React from 'react';

const SignupForm = (props) => {

    return (
        <div className="signup-form container">
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
                            <input name="firstName" type="text" className="form-control" onChange={ props.handleInputChange}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" className="form-control" onChange={ props.handleInputChange}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" onChange={ props.handleInputChange}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control" aria-describedby="passwordHelp" onChange={ props.handleInputChange}/>
                            <small id="passwordHelp" className="form-text" style={{color : props.passwordNoteColor}}>Password must be 8 characters long.</small>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default SignupForm;