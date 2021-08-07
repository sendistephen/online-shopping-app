import { isAuthenticated } from 'api/auth';
import { Link } from 'react-router-dom';

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className='btn btn-info btn-sm'>Checkout</button>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-warning btn-sm'>Sign in to checkout</button>
      </Link>
    );
  };
  return (
    <div>
      <p className='lead'>Total: ${getTotal()}</p>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
