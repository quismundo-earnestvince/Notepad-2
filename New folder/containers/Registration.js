import React from 'react';
import Button from '../components/Button';
 
const RegistrationForm = () => {
  return (
    <center>
    <div className="registration-form">
      <form>
        <p id="signup">Sign Up</p>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" />
          </div>
        </div>
        <Button text="Sign Up" />
        <p className="login-link"><a href="#">Already have an account? Sign in</a></p>
      </form>
    </div>
    </center>
  );
};
 
export default RegistrationForm;
 
 
 