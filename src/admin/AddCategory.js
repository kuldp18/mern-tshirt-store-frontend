import React, { useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Home
        </Link>
      </div>
    );
  };

  const handleChange = (e) => {
    setError(false);
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    // firing backend request
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError(false);
          setSuccess(true);
          setName('');
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">New category added!</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to add new category!</h4>;
    }
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category :</p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="For eg. Summer"
            value={name}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="btn btn-outline-info">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create Category"
      description="Add a new category for your product"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {categoryForm()} {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
