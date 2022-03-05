import React, { useState, useEffect } from 'react';
import Base from './Base';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';
import { fetchProducts } from './helper/coreapicalls';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    fetchProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to our T-Shirt Store!">
      <div className="row text-center">
        <h1 className="text-white mb-3">Our T-Shirts</h1>
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-4 mb-4" key={uuidv4()}>
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
