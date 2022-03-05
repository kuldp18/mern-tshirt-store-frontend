import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getAllCategories, createProduct } from './helper/adminapicall';

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    size: '',
    photo: '',
    categories: [],
    category: '',
    loading: false,
    error: '',
    createdProduct: '',
    getRedirect: false,
    formData: '',
  });

  const {
    name,
    description,
    price,
    stock,
    // photo,
    categories,
    // category,
    // loading,
    error,
    createdProduct,
    // getRedirect,
    formData,
    size,
  } = values;

  const preload = () => {
    getAllCategories()
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, [preload]);

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: '', loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            getRedirect: false,
          });
        } else {
          setValues({
            ...values,
            name: '',
            description: '',
            price: '',
            photo: '',
            stock: '',
            size: '',
            category: '',
            loading: false,
            createdProduct: data.name,
            getRedirect: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const createProductForm = () => (
    <form>
      <span>Product photo:</span>
      <div className="form-group">
        <label className="btn btn-block btn-info">
          <input
            onChange={handleChange('photo')}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange('name')}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange('description')}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange('price')}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange('size')}
          type="text"
          className="form-control"
          placeholder="Size"
          value={size}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange('category')}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option value={cate._id} key={index}>
                  {cate.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange('stock')}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-outline-success"
      >
        Create Product
      </button>
    </form>
  );

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? '' : 'none' }}
      >
        <h4>{createdProduct} added successfully!</h4>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-warning mt-3"
        style={{ display: error ? '' : 'none' }}
      >
        <h4>Failed to create new product, please try again!</h4>
      </div>
    );
  };

  // const performRedirect = () => {
  //   if (getRedirect) {
  //     return <Redirect to="/admin/dashboard" />;
  //   }
  // };

  return (
    <Base
      title="Add a New Product!"
      description="Welcome to product creation section."
      className="container bg-info p-4 mb-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Home
      </Link>

      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2 p-4">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
          {/* {() => {
            return setTimeout(performRedirect(), 2000);
          }} */}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
