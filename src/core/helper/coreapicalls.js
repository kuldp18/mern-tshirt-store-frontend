import { API } from '../../backend';

export const fetchProducts = () => {
  return fetch(`${API}/products`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
