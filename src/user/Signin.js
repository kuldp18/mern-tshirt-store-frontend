import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { signin, isAuthenticated, authenticate } from '../auth/helper';

const Signin = () => {
  const initialState = {
    email: '',
    password: '',
    error: '',
    loading: false,
    didRedirect: false,
  };
  const [formValues, setFormValues] = useState(initialState);
  const { email, password, error, loading, didRedirect } = formValues;
  const { user } = isAuthenticated();

  const handleChange = (field) => (e) => {
    setFormValues({ ...formValues, error: false, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setFormValues({ ...formValues, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setFormValues({
              ...formValues,
              email: '',
              password: '',
              error: '',
              loading: false,
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => {
        console.log('Signin failed!');
        console.error(err);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={handleChange('email')}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={handleChange('password')}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base
      title="Sign in page!"
      description="A page for signing in to the store!"
    >
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
