import { useEffect, useState } from 'react';
import 'braintree-web';
import DropIn from 'braintree-web-drop-in-react';
import { isAuthenticated } from 'api/auth';
import { Link } from 'react-router-dom';
import { getBraintreeClientToken, processPayment } from '../../api/braintree';
import { emptyCart } from 'components/Cart/CartHelpers';

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
    loading: false,
  });

  const userId = isAuthenticated() && isAuthenticated().foundUser._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };
  useEffect(() => {
    getToken(userId, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-warning btn-sm'>Sign in to checkout</button>
      </Link>
    );
  };
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault',
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className='btn btn-sm btn-danger'>
            Confirm
          </button>
        </div>
      ) : null}
    </div>
  );
  const buy = () => {
    setData({ loading: true });
    // send nonce to the server
    // nonce=data.instance.requestPaymentMethod()
    let nonce;
    data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        // once we have nonce(cardType, cardNumber etc), send nonce as 'paymentMethodNonce' to backend and the total to be charged
        const paymentData = {
          paymentMethodeNonce: nonce,
          amount: getTotal(products),
        };
        processPayment(userId, token, paymentData)
          .then((res) => {
            setData({ ...data, success: res.success });
            // empty cart
            emptyCart(() => {
              console.log('Payment complete. Empty cart');
              setData({ loading: false });
            });
            // create order
          })
          .catch((err) => {
            setData({ loading: false, error: err });
          });
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };
  const showLoading = (loading) =>
    loading && <p className='lead'>Loading...</p>;
  const showError = (error) => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );
  const showMsg = (success) => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Your payment was successfull!
    </div>
  );
  return (
    <div>
      <p className='lead'>Total: ${getTotal()}</p>
      {showLoading(data.loading)}
      {showError(data.error)}
      {showMsg(data.success)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
