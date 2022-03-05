import React, { useState, useEffect } from 'react';
import Base from './Base';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';
import { loadCartFromLocalStorage } from './helper/cartHelper';
// import StripeCheckout from './payments/StripeCheckout';
import PaypalCheckout from './payments/PaypalCheckout';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCartFromLocalStorage());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div className="text-white">
        <h2>This is for loading products</h2>
        {products.map((product) => {
          return (
            <Card
              product={product}
              key={uuidv4()}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Base title="Your Cart" description="Ready to checkout!">
      <div className="row">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No products in cart.</h3>
          )}
        </div>
        {/* <div className="col-6">
          <StripeCheckout products={products} setReload={setReload} />
        </div> */}
        <div className="col-6">
          <PaypalCheckout products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
