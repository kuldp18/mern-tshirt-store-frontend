import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/helper';
import { emptyTheCart, loadCartFromLocalStorage } from '../helper/cartHelper';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../../backend';
import { createOrder } from '../helper/orderHelper';

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: '',
    address: '',
  });

  const getFinalPrice = () => {
    let amount = 0;
    products.map((product) => {
      amount += product.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(`${API}/stripepayment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        // call further methods
        const { status } = res;
        console.log(status);
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy T-Shirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Sign in</button>
      </Link>
    );
  };

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
