import { API } from '../../backend';

// category calls

// create a category
export const createCategory = (userId, token, categoryName) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryName),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

// update a category

export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// delete a category

export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// get all categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
// get a category
export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// product calls

// create a product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// get all products
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// delete a product

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// get a product

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// update a product

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
