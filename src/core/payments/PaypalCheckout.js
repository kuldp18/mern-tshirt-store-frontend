import React, { useState, useEffect } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import { emptyTheCart } from '../helper/cartHelper';
// import { Link } from 'react-router-dom';
import { getMeToken, processMyPayment } from './helpers/paypalHelpers';
import { createOrder } from '../helper/orderHelper';
import { isAuthenticated } from '../../auth/helper';

const PaypalCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
  });

  const getToken = (userId, token) => {
    getMeToken(userId, token)
      .then((info) => {
        // console.log('INFO ', info);
        if (info.error) {
          setInfo({ ...info, error: info.error });
        } else {
          const clientToken = info.clientToken;
          setInfo({ clientToken });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getToken(userId, token);
  }, [userId, token]);

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              onClick={handlePurchase}
              className="btn btn-block btn-success"
            >
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart.</h3>
        )}
      </div>
    );
  };

  const handlePurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };

        processMyPayment(userId, token, paymentData)
          .then((res) => {
            console.log('PAYMENT SUCCESS! ', res);
            setInfo({ ...info, success: res.success, loading: false });
            // TODO: create order
            const orderData = {
              products: products,
              transaction_id: res.transaction.id,
              amount: res.transaction.amount,
            };
            createOrder(userId, token, orderData);
            emptyTheCart(() => {
              console.log('Did we got a crash?');
            });
            setReload(!reload);
          })
          .catch((err) => {
            setInfo({ loading: false, success: false });
            console.log('PAYMENT FAILED! ', err);
          });
      })
      .catch((err) => {
        setInfo({ loading: false, success: false });
        console.log(err);
      });

    return getNonce;
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => (amount += p.price));
    return amount;
  };

  return (
    <div className="text-white">
      <h3>Paypal Checkout</h3>
      <h4>Bill: {getAmount()} $</h4>
      {showDropIn()}
    </div>
  );
};

export default PaypalCheckout;
