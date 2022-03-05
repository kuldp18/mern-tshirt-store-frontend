import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
const Signup = () => {
  const initialFormState = {
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  };
  const [formValues, setFormValues] = useState(initialFormState);
  const { name, email, password, error, success } = formValues;

  const handleChange = (field) => (e) => {
    setFormValues({ ...formValues, error: false, [field]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setFormValues({ ...formValues, error: data.error, success: false });
        } else {
          setFormValues({
            ...formValues,
            name: '',
            email: '',
            password: '',
            error: '',
            success: true,
          });
        }
      })
      .catch((err) => {
        console.log('error in signing up!');
        console.error(err);
      });
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form className="mb-5">
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={handleChange('name')}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={handleChange('email')}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={handleChange('password')}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block"
              onClick={submitForm}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? '' : 'none' }}
          >
            Your account was created successfully! Please
            <Link to="/signin">Login</Link> here.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base
      title="Sign up page!"
      description="A page for signing up to the store!"
    >
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
